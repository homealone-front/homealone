import { Appbar } from '@/components/Appbar';
import { Footer } from '@/components/Footer';
import { Outlet } from 'react-router-dom';

/**
 * Appbar, Footer로 구성된 Layout(기본)
 */

const Layout = () => {
  return (
    <div className="wrapper w-full h-full ">
      <Appbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
