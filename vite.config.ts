import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

import { dependencies } from './package.json';

const renderChunks = (deps: Record<string, string>) => {
  const chunks: { [key: string]: string[] } = {};

  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom', 'pretendard', 'firebase'].includes(key)) {
      return;
    }
    chunks[key] = [key];
  });

  return chunks;
};

/**
 * @see https://vitejs.dev/config/
 */
export default ({ mode }: { mode: 'development' | 'production' }) =>
  defineConfig({
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 8060,
      watch: {
        usePolling: true,
      },
      cors: true,
      proxy: {
        '/api': {
          target: 'https://www.home-alone.site/',
          changeOrigin: true,
        },
      },
    },

    define: {
      'import.meta.env.DEV': mode === 'development',
      'import.meta.env.PROD': mode === 'development',
    },

    build: {
      outDir: 'build',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'development',
          drop_debugger: mode === 'development',
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom'],
            ...renderChunks(dependencies),
          },
        },
      },
    },

    assetsInclude: ['**/*.node'],

    resolve: {
      alias: { '@': resolve(__dirname, './src') },
    },
  });
