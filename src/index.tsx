import './preload';
import '@/lib/tailwind.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { queryClient } from './services/quries';
import { QueryClientProvider } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
