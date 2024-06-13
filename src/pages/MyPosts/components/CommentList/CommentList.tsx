import { Pagination } from '@/components/Pagination';

import { useState } from 'react';

import { NoContents } from '../NoContents';

import { NAV_TABS } from '../../constants';

import { CommentCard } from './components/CommentCard';
import { useMyCommentListQuery } from '@/services/comment/useMyCommentListQuery';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * 내가 작성한 댓글 목록 컴포넌트
 */

const CommentList = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isLoading, isFetching } = useMyCommentListQuery({ page: currentPage, size: 20 });

  const handlePageMove = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {!data?.content.length ? (
        <NoContents {...NAV_TABS.comment} />
      ) : (
        <div className="w-full flex flex-col justify-between mt-10">
          <div>
            <div className="mb-4 flex items-center">
              <span className="text-medium text-gray700 mr-1">전체</span>
              <span className="text-sm font-light text-gray400">{data.totalElements}</span>
            </div>
            <div className="flex flex-col place-items-start border-x border-t mb-10">
              {isLoading || isFetching
                ? Array.from({ length: data.content.length }).map((_, index) => (
                    <Skeleton key={index} className="h-[6rem] w-full mb-2" />
                  ))
                : data?.content?.map((item) => <CommentCard {...item} />)}
            </div>
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

export default CommentList;
