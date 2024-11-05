import { CheckCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';

import { RemoveCommentDeleteFetchParams, removeCommentDeleteFetch } from '@/api/comment/removeCommentDeleteFetch';

/**
 * 내가 작성한 댓글 삭제
 */
export const useCommentDeleteMutation = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: RemoveCommentDeleteFetchParams) => removeCommentDeleteFetch(params),
    onSuccess: () => {
      toast({
        title: '댓글이 삭제되었습니다.',
        icon: <CheckCircle />,
        className: TOAST.success,
      });
      queryClient.invalidateQueries({ queryKey: ['@my-comment-list'] });
    },
  });
  return mutation;
};
