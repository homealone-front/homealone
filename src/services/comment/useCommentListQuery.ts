import { useQuery } from '@tanstack/react-query';

import { commentListGetFetch, CommentListGetFetchParams, CommentListResponse } from '@/api/comment/commentListGetFetch';

/**
 * 댓글 조회
 */
export const useCommentListQuery = ({ postId }: CommentListGetFetchParams) =>
  useQuery({
    queryKey: ['@comment-list', postId],
    queryFn: async () => {
      const res = await commentListGetFetch({ postId });

      const { data } = res;

      return data as CommentListResponse[];
    },

    staleTime: 5000,
  });
