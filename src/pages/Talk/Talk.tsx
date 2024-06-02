import { useForm, FormProvider } from 'react-hook-form';
import { Search } from 'lucide-react';
import { useNavigate, generatePath } from 'react-router-dom';

import { Appbar } from '@/components/Appbar';
import { Searchbar } from '@/components/Searchbar';
import { Select } from '@/components/Select';
import { Pagination } from '@/components/Pagination';
import { Footer } from '@/components/Footer';
import { Card as TextCard } from '@/components/Card';

import { Layout } from '@/layout';
import { CATEGORY_OPTIONS } from '../Main/constants';
import { ListTitle } from '../Main/components/ListTitle';
import { DateSlot } from '../Main/components/DateSlot';
import { TALK_PATH } from '@/constants/paths';

/**
 * 혼잣말 페이지
 */
const Talk = () => {
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
            <Select name="category" options={CATEGORY_OPTIONS} />
            <div className="w-[40rem] m-auto relative">
              <Searchbar />
              <Search className="absolute top-[0.5rem] right-[0.6rem] appearance-none" stroke="#737373" />
            </div>
          </div>
        </FormProvider>
        <ListTitle
          imgPath="/icons/single_ment.png"
          title="케빈들의 잡담"
          description="케빈들은 지금 무슨 생각을 하고 있을까요?"
        />
        <div className="grid grid-cols-4 gap-6 place-items-start">
          {Array.from({ length: 20 }).map((_, i) => (
            <TextCard
              key={i}
              lineClamp={2}
              slot={<DateSlot dateTime="2024년 5월 31일" />}
              likes={40}
              onPageMove={() =>
                navigate(
                  generatePath(TALK_PATH.detail, {
                    id: i.toString(),
                  }),
                )
              }
            />
          ))}
        </div>
        <Pagination totalPage={4} totalItem={80} currentPage={1} onPageChange={() => alert('페이지네이션 로직 필요')} />
      </Layout>
      <Footer />
    </>
  );
};

export default Talk;
