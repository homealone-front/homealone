import { useQuery } from '@tanstack/react-query';

import { myCommentListGetFetch, MyCommentListGetFetchParams } from '@/api/comment/myCommentListGetFetch';

/**
 * 내가 작성한 댓글 조회
 */
export const useMyCommentListQuery = (params: MyCommentListGetFetchParams) =>
  useQuery({
    queryKey: ['@my-comment-list', params],
    queryFn: async () => {
      const res = await myCommentListGetFetch(params);

      const { data } = res;

      const { totalElements, totalPages, pageable, content } = data;
      return {
        totalElements,
        totalPages,
        pageable,
        content,
      };
    },
    staleTime: 5000,
  });
