import { useForm, FormProvider } from 'react-hook-form';
import { Search } from 'lucide-react';

import { Layout } from '@/layout';

import { Appbar } from '@/components/Appbar';
import { Select } from '@/components/Select';
import { Searchbar } from '@/components/Searchbar';
import { Card } from '@/components/Card';
import { Card as TextCard } from '@/components/Card';
import { Footer } from '@/components/Footer';
import { PriceSlot } from './components/PriceSlot';
import { DateSlot } from './components/DateSlot';
import { ListTitle } from './components/ListTitle';

import { PATH } from '@/constants/paths';
import { CATEGORY_OPTIONS } from './constants';

import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';

const Main = () => {
  const navigate = usePageMoveHandler();
  /**
   * 검색창에서 메인페이지 전체 렌더링 발생했던 부분
   * - 콘솔에 watch 메서드로 상태찍고 있었어서 그랬던 거였숩니다...
   */
  const method = useForm({
    values: { category: '전체', query: '' },
  });

  return (
    <>
      <Appbar />
      <Layout>
        <FormProvider {...method}>
          <div className="flex w-[40rem] gap-4 mx-auto">
            <Select name="category" options={CATEGORY_OPTIONS} />
            <div className="w-[40rem] m-auto relative">
              <Searchbar />
              <Search className="absolute top-[0.5rem] right-[0.6rem] appearance-none" stroke="#737373" />
            </div>
          </div>
        </FormProvider>
        <ListTitle
          imgPath="/icons/receipe_icon.png"
          title="트렌드 레시피"
          description="하루 10분이면 뚝딱! 사용자들이 많이 보고 있는 레시피에요"
          onPageMove={() => navigate(PATH.receipe)}
        />

        <div className="grid grid-cols-4 gap-6 place-items-start">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              imgPath="https://github.com/shadcn.png"
              lineClamp={1}
              slot={
                <PriceSlot
                  cookInfo={{
                    cookPrice: '3000원',
                    cookTime: '30분',
                  }}
                />
              }
              likes={40}
            />
          ))}
        </div>
        <ListTitle
          imgPath="/icons/room_icon.png"
          title="최근 인기 방자랑"
          description="인테리어 어떻게 할 지 고민될 때! 다른사람들은 어떻게 꾸몄을까요?"
          onPageMove={() => navigate(PATH.room)}
        />
        <div className="grid grid-cols-4 gap-6 place-items-start">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              imgPath="https://github.com/shadcn.png"
              lineClamp={1}
              slot={<DateSlot dateTime="2024년 5월 31일" />}
              likes={40}
            />
          ))}
        </div>

        <ListTitle
          imgPath="/icons/single_ment.png"
          title="나홀로 집에서 혼잣말"
          description="혼잣말은 일상생활에 힘이 됩니다."
          onPageMove={() => navigate(PATH.talk)}
        />
        <div className="grid grid-cols-4 gap-6 place-items-start mb-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <TextCard key={i} lineClamp={2} slot={<DateSlot dateTime="2024년 5월 12일" />} likes={40} />
          ))}
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Main;
