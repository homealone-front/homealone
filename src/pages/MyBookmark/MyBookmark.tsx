import { NAV_TABS } from './constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * 저장한 글 페이지 컴포넌트
 */

const MyBookmark = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow">
        <div className="flex items-center gap-4 mb-10">
          <img className="h-9" src="/icons/bookmark_icon.svg" alt="bookmark_icon" />
          <span className="text-2xl font-normal text-gray-800">저장한 글</span>
        </div>
        <div className="flex flex-col min-h-[42rem] mx-auto">
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
      </div>
    </div>
  );
};

export default MyBookmark;
