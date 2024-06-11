import { Layout } from '@/layout';
import { Appbar } from '@/components/Appbar';
import { Footer } from '@/components/Footer';

import { Leave } from './components/Leave';
import { EditForm } from './components/EditForm';

/**
 * 마이페이지 컴포넌트
 */

const Mypage = () => {
  return (
    <>
      <Appbar />
      <Layout>
        <div className="flex flex-row items-center gap-6 mb-16">
          <img src="/icons/arrow_svg_rightdown.svg" alt="arrow_icon" />
          <span className="text-xl font-semibold text-gray-800">나의 정보</span>
        </div>
        <div className="flex gap-10">
          <div className="min-w-[53.25rem] mx-auto">
            <EditForm />
            <Leave />
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Mypage;
