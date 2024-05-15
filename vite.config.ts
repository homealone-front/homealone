import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dependencies } = require('./package.json');

const renderChunks = (deps: Record<string, string>) => {
  const chunks: { [key: string]: string[] } = {};

  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom', 'pretendard'].includes(key)) {
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
      port: 8080,
      watch: {
        usePolling: true,
      },
      cors: true,
      proxy: {
        '/JohnDoe': {
          target: '타겟 설정 필요',
          changeOrigin: true,
        },
      },
    },

    define: {
      'import.meta.env.DEV': mode === 'development' ? true : false,
      'import.meta.env.PROD': mode === 'development' ? false : true,
    },

    build: {
      outDir: 'build',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'development' ? false : true,
          drop_debugger: mode === 'development' ? false : true,
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
