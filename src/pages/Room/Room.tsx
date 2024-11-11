import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { useNavigate, generatePath } from 'react-router-dom';

import { Searchbar } from '@/components/Searchbar';
import { Select } from '@/components/Select';
import { Pagination } from '@/components/Pagination';

import { Card as RoomCard } from '@/components/Card';

import { CATEGORY_OPTIONS } from '../Main/constants';
import { ListTitle } from '../Main/components/ListTitle';

import { PATH, ROOM_PATH } from '@/constants/paths';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRoomListQuery } from '@/services/room/useRoomListQuery';
import { SkeletonCard } from '@/components/Skeleton';

import { RoomCardSlot } from './components/RoomCardSlot';
import { useUserStore } from '@/store/useUserStore';
import { RoomListGetFetchParams, RoomListResponse } from '@/api/room/roomListGetFetch';
import { useSearchRoomQuery } from '@/services/search/useSearchQuery';
import { NoContents } from '../MyPosts/components/NoContents';
import { NAV_TABS } from '../MyPosts/constants';

/**
 * 방자랑 페이지 컴포넌트
 */
const Room = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<RoomListGetFetchParams>({ page: 0, size: 20 });

  const accessToken = useUserStore((state) => state.accessToken);

  const { data, isLoading } = useRoomListQuery({ page: currentPage, size: 20 });
  const { data: searchData, isLoading: isSearchLoading } = useSearchRoomQuery(searchParams);

  const navigate = useNavigate();

  const method = useForm({
    values: { category: 'all', query: '' },
  });

  const handlePageMove = (page: number) => {
    setCurrentPage(page);
    setSearchParams((prevParams: RoomListGetFetchParams) => ({ ...prevParams, page }));
  };

  const handleSearch = (params: FieldValues) => {
    setSearchParams({ ...params, page: 0, size: 20 });
    setCurrentPage(0);
  };

  const renderCards = () => {
    const cardData = searchParams.query ? searchData : data;
    const loading = searchParams.query ? isSearchLoading : isLoading;

    if (loading) {
      return Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />);
    }

    return cardData?.content?.map((card: ArrayType<PropType<RoomListResponse, 'content'>>) => (
      <RoomCard
        key={card?.id}
        title={card?.title}
        userName={card?.memberName}
        lineClamp={1}
        userImage={card?.imageUrl}
        slot={<RoomCardSlot createdAt={card?.createdAt} commentCount={card?.commentCount} />}
        likes={card?.likeCount}
        imageUrl={card.thumbnailUrl}
        onPageMove={() =>
          navigate(
            generatePath(ROOM_PATH.detail, {
              id: card.id.toString(),
            }),
          )
        }
      />
    ));
  };

  return (
    <>
      <FormProvider {...method}>
        <div className="flex w-[40rem] gap-4 mx-auto">
          <Select name="category" options={CATEGORY_OPTIONS} />
          <div className="w-[40rem] m-auto relative">
            <Searchbar onSearch={handleSearch} />
          </div>
        </div>
      </FormProvider>
      {!searchData?.content.length && !isLoading ? (
        <div className="flex justify-center">
          <NoContents {...NAV_TABS.room} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <ListTitle
              imgPath="/icons/room_icon.png"
              title="케빈들의 아지트"
              description="다른사람들의 아지트를 확인해보세요!"
            />
            {accessToken && (
              <Button className="rounded-full" onClick={() => navigate(PATH.roomWrite)}>
                새 글 작성
              </Button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-6 place-items-start">{renderCards()}</div>
          <Pagination totalPage={data?.totalPages as number} currentPage={currentPage} onPageChange={handlePageMove} />
        </>
      )}
    </>
  );
};

export default Room;
