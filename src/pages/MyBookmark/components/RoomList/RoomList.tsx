import { useNavigate, generatePath } from 'react-router-dom';

import { Pagination } from '@/components/Pagination';
import { Card } from '@/components/Card';

import { ROOM_PATH } from '@/constants/paths';
import { useState } from 'react';
import { useMyBookmarkedRoomListQuery } from '@/services/room/useMyBookmarkedRoomListQuery';
import { SkeletonCard } from '@/components/Skeleton';

import { RoomCardSlot } from '@/pages/Room/components/RoomCardSlot';
import { NoBookmark } from '../NoBookmark';

import { NAV_TABS } from '../../constants';

/**
 * 내가 저장한 방자랑 글 목록 컴포넌트
 */

const RoomList = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isLoading, isFetching } = useMyBookmarkedRoomListQuery({ page: currentPage, size: 20 });

  const navigate = useNavigate();

  const handlePageMove = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {!data?.content.length ? (
        <NoBookmark {...NAV_TABS.room} />
      ) : (
        <div className="flex flex-col justify-between mt-10">
          <div className="mb-4 flex items-center">
            <span className="text-medium text-gray700 mr-1">전체</span>
            <span className="text-sm font-light text-gray400">{data.totalElements}</span>
          </div>
          <div className="grid grid-cols-4 gap-6 place-items-start pb-10">
            {isLoading || isFetching
              ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
              : data?.content?.map((card, i) => (
                  <Card
                    key={i}
                    description=""
                    title={card?.title}
                    userName={card?.memberName}
                    userImage={card?.imageUrl}
                    imageUrl={card?.thumbnailUrl}
                    lineClamp={1}
                    likes={card.likeCount}
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
          {data?.totalPages > 1 && (
            <Pagination
              totalPage={data?.totalPages as number}
              currentPage={currentPage}
              onPageChange={handlePageMove}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RoomList;
