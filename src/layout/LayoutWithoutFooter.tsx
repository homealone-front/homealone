import { Appbar } from '@/components/Appbar';
import { Outlet } from 'react-router-dom';

/**
 * Appbar로 구성된 Layout
 */

const LayoutWithoutFooter = () => {
  return (
    <div className="wrapper w-full h-full ">
      <Appbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithoutFooter;
