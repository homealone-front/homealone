import { Suspense } from 'react';
import Routes from '@/routes/Router';

function App() {
  return (
    <Suspense fallback>
      <Routes />
    </Suspense>
  );
}

export default App;
