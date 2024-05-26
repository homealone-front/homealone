import { useForm, FormProvider } from 'react-hook-form';
import { Layout } from '@/layout';

import { Appbar } from '@/components/Appbar';
import { Select } from '@/components/Select';

import { CATEGORY_OPTIONS } from './constants';
import { Searchbar } from '@/components/Searchbar';
import { Search } from 'lucide-react';

const Main = () => {
  const method = useForm({
    values: { category: '전체', query: '' },
  });

  const { watch } = method;

  console.info('검색 상태 확인', watch());

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
      </Layout>
    </>
  );
};

export default Main;
