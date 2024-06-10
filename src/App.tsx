import Routes from '@/routes/Router';
import { Toaster } from '@/components/ui/toaster';
import { useModalStore } from '@/store/useModalStore';

function App() {
  const isOpen = useModalStore((state) => state.isOpen);
  const Modal = useModalStore((state) => state.Modal);

  return (
    <>
      {isOpen ? Modal : null}
      <Toaster />
      <Routes />
    </>
  );
}

export default App;
