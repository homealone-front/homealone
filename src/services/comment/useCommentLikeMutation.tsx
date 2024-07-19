import { commentLikePostFetch } from '@/api/comment/commentLikePostFeth';
import { CommentListResponse } from '@/api/comment/commentListGetFetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLikeCommentMutation = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['@comment-list', postId.toString()];

  const { mutate } = useMutation({
    mutationFn: () => commentLikePostFetch({ commentId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousComment = queryClient.getQueryData<CommentListResponse[]>(queryKey);

      if (previousComment) {
        const updatedComments = previousComment.map((comment) => {
          if (comment.id === commentId) {
            const isLiked = comment.likeByCurrentUser;
            return {
              ...comment,
              likeByCurrentUser: !isLiked,
              likeCount: isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
            };
          }
          return comment;
        });

        queryClient.setQueryData(queryKey, updatedComments);
      }

      return { previousComment };
    },
    onError: (error, _, context) => {
      console.error('Mutation error:', error);
      queryClient.setQueryData(queryKey, context?.previousComment);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return { mutate };
};
