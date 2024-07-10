import { useState } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { useNavigate, generatePath } from 'react-router-dom';

import { Searchbar } from '@/components/Searchbar';
import { Select } from '@/components/Select';
import { Pagination } from '@/components/Pagination';

import { Card as TextCard } from '@/components/Card';
import { ListTitle } from '../Main/components/ListTitle';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/Skeleton';
import { RoomCardSlot } from '../Room/components/RoomCardSlot';

import { CATEGORY_OPTIONS } from '../Main/constants';
import { PATH, TALK_PATH } from '@/constants/paths';

import { useTalkListQuery } from '@/services/talk/useTalkListQuery';
import { useSearchTalkQuery } from '@/services/search/useSearchQuery';
import { TalkListGetFetchParms, TalkListResponse } from '@/api/talk/talkListGetFetch';
import { useUserStore } from '@/store/useUserStore';
import { NoContents } from '../MyPosts/components/NoContents';
import { NAV_TABS } from '../MyPosts/constants';

/**
 * 혼잣말 페이지(목록 조회)
 */
const Talk = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<TalkListGetFetchParms>({ page: 0, size: 20 });

  const accessToken = useUserStore((state) => state.accessToken);

  const { data, isLoading, isFetching } = useTalkListQuery({ page: currentPage, size: 20 });
  const { data: searchData, isLoading: isSearchLoading } = useSearchTalkQuery(searchParams);

  const navigate = useNavigate();

  const method = useForm({
    values: { category: 'all', query: '' },
  });

  const handlePageMove = (page: number) => {
    setCurrentPage(page);
    setSearchParams((prevParams: TalkListGetFetchParms) => ({ ...prevParams, page }));
  };

  const handleSearch = (params: FieldValues) => {
    setSearchParams({ ...params, page: 0, size: 20 });
    setCurrentPage(0);
  };

  const cardData = searchParams.query ? searchData : data;
  const loading = searchParams.query ? isSearchLoading : isLoading;

  const renderCards = () => {
    if (loading || isFetching) {
      return Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />);
    }

    return cardData?.content?.map((card: TalkListResponse['content'][number]) => (
      <TextCard
        key={card?.id}
        description={card?.contentSummary}
        title={card?.title}
        userName={card?.memberName}
        lineClamp={1}
        userImage={card?.imageUrl}
        slot={<RoomCardSlot createdAt={card?.createdAt} commentCount={card?.commentCount} />}
        likes={card?.likeCount}
        onPageMove={() =>
          navigate(
            generatePath(TALK_PATH.detail, {
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
      {!cardData?.content.length && !isLoading ? (
        <div className="flex justify-center">
          <NoContents {...NAV_TABS.talk} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <ListTitle
              imgPath="/icons/single_ment.png"
              title="케빈들의 잡담"
              description="케빈들은 지금 무슨 생각을 하고 있을까요?"
            />
            {accessToken && (
              <Button className="rounded-full" onClick={() => navigate(PATH.talkWrite)}>
                새 글 작성
              </Button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-6 place-items-start py-12">{renderCards()}</div>
          <Pagination
            totalPage={(searchParams.query ? searchData : data)?.totalPages as number}
            currentPage={currentPage}
            onPageChange={handlePageMove}
          />
        </>
      )}
    </>
  );
};

export default Talk;
