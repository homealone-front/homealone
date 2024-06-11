import { useForm, FormProvider } from 'react-hook-form';
import { Search } from 'lucide-react';
import { useNavigate, generatePath } from 'react-router-dom';

import { Appbar } from '@/components/Appbar';
import { Searchbar } from '@/components/Searchbar';
import { Select } from '@/components/Select';
import { Pagination } from '@/components/Pagination';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';

import { Layout } from '@/layout';
import { CATEGORY_OPTIONS } from '../Main/constants';
import { ListTitle } from '../Main/components/ListTitle';

import { PATH, ROOM_PATH } from '@/constants/paths';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRoomListQuery } from '@/services/room/useRoomListQuery';
import { SkeletonCard } from '@/components/Skeleton';

import { RoomCardSlot } from './components/RoomCardSlot';

/**
 * 방자랑 페이지 컴포넌트
 */
const Room = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isLoading, isFetching } = useRoomListQuery({ page: currentPage, size: 20 });

  const navigate = useNavigate();

  const method = useForm({
    values: { category: '전체', query: '' },
  });

  const handlePageMove = (page: number) => {
    setCurrentPage(page);
  };

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
        <div className="flex justify-between items-center">
          <ListTitle
            imgPath="/icons/room_icon.png"
            title="케빈들의 아지트"
            description="다른사람들의 아지트를 확인해보세요!"
          />
          <Button className="rounded-full" onClick={() => navigate(PATH.roomWrite)}>
            새 글 작성
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-6 place-items-start">
          {isLoading || isFetching
            ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
            : data?.content?.map((card, i) => (
                <Card
                  key={i}
                  description=""
                  title={card?.title}
                  userName={card?.memberName}
                  imageUrl={card?.thumbnailUrl}
                  lineClamp={1}
                  slot={<RoomCardSlot createdAt={card?.createdAt} commentCount={card?.commentCount} />}
                  onPageMove={() =>
                    navigate(
                      generatePath(ROOM_PATH.detail, {
                        id: card.id.toString(),
                      }),
                    )
                  }
                />
              ))}
        </div>
        <Pagination totalPage={data?.totalPages as number} currentPage={currentPage} onPageChange={handlePageMove} />
      </Layout>
      <Footer />
    </>
  );
};

export default Room;
