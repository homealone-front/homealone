import { Appbar } from '@/components/Appbar';
import { Footer } from '@/components/Footer';
import { Outlet } from 'react-router-dom';

/**
 * Appbar, Footer, Banner로 구성된 Layout
 */

const LayoutWithBanner = () => {
  return (
    <div className="wrapper w-full h-full ">
      <Appbar />
      <div className="bg-[#10BE62] -mt-12">
        <img src="/images/main_img.png" className="w-1/2 mx-auto my-0" />
      </div>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutWithBanner;
