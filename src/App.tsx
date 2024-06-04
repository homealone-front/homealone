import { Suspense } from 'react';
import Routes from '@/routes/Router';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Suspense fallback>
      <Toaster />
      <Routes />
    </Suspense>
  );
}

export default App;
