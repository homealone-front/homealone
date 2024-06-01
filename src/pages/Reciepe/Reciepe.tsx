import { useForm, FormProvider } from 'react-hook-form';
import { Search } from 'lucide-react';

import { Appbar } from '@/components/Appbar';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';
import { Searchbar } from '@/components/Searchbar';
import { Select } from '@/components/Select';

import { Layout } from '@/layout';

import { ListTitle } from '@/pages/Main/components/ListTitle';
import { PriceSlot } from '@/pages/Main/components/PriceSlot';
import { CATEGORY_OPTIONS } from '../Main/constants';
import { Pagination } from '@/components/Pagination';

import { useNavigate, generatePath } from 'react-router-dom';
import { RECIEPE_PATH } from '@/constants/paths';

/**
 * 레시피 페이지 컴포넌트
 */
const Receipe = () => {
  const navigate = useNavigate();

  const method = useForm({
    values: { category: '전체', query: '' },
  });

  return (
    <>
      <Appbar />
      <Layout>
        <FormProvider {...method}>
          <div className="flex w-[40rem] gap-4 mx-auto">
            <Select options={CATEGORY_OPTIONS} />
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
        />
        <div className="grid grid-cols-4 gap-6 place-items-start">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              onPageMove={() =>
                navigate(
                  generatePath(RECIEPE_PATH.detail, {
                    id: i.toString(),
                  }),
                )
              }
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
        <ListTitle imgPath="/icons/receipe_icon.png" title="모든 레시피" />
        <div className="grid grid-cols-4 gap-6 place-items-start py-12">
          {Array.from({ length: 20 }).map((_, i) => (
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
        <Pagination
          totalPage={4}
          totalItem={80}
          currentPage={1}
          onPageChange={() => alert('페이지네이션 로직 적용 필요')}
        />
      </Layout>
      <Footer />
    </>
  );
};

export default Receipe;
