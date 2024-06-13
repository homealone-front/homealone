import { Layout } from '@/layout';
import { Appbar } from '@/components/Appbar';
import { Footer } from '@/components/Footer';

import { NAV_TABS } from './constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * 작성한 글 페이지 컴포넌트
 */

const MyPosts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Appbar />
      <div className="grow">
        <Layout>
          <div className="flex items-center gap-6 mb-7">
            <img src="/icons/arrow_svg_rightdown.svg" alt="arrow_icon" />
            <span className="text-xl font-medium text-gray-800">작성한 글</span>
          </div>
          <div className="flex flex-col min-h-[49rem] mx-auto">
            <div className=" bg-white border border-gray200 rounded-lg px-8 pt-4 mb-24 grow ">
              <Tabs defaultValue={Object.values(NAV_TABS)[0].name}>
                <TabsList>
                  {Object.entries(NAV_TABS).map(([key, value]) => (
                    <TabsTrigger key={key} value={value.name}>
                      {value.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(NAV_TABS).map(([key, value]) => (
                  <TabsContent key={key} value={value.name} className="flex flex-col items-center justify-center ">
                    {value.content}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </div>
  );
};

export default MyPosts;
