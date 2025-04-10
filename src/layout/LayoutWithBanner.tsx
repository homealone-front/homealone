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
        <picture>
          <source srcSet="/images/main_img.webp" type="image/webp"></source>
          <img src="/images/main_img.png" className="w-1/2 mx-auto my-0" width={960} height={540} alt="banner-image" />
        </picture>
      </div>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutWithBanner;
