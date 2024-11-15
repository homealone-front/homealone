import Routes from '@/routes/Router';
import { Toaster } from '@/components/ui/toaster';
import { useModalStore } from '@/store/useModalStore';

function App() {
  const isOpen = useModalStore((state) => state.isOpen);
  const Modal = useModalStore((state) => state.Modal);

  return (
    <div className="bg-[#F9F7F4] min-h-screen  min-w-[24rem]">
      {isOpen ? Modal : null}
      <Toaster />
      <Routes />
    </div>
  );
}

export default App;
