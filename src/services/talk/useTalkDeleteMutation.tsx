import { CheckCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';

import { useNavigate } from 'react-router-dom';
import { TalkDeleteFetchParams, talkDeleteFetch } from '@/api/talk/talkDeleteFetch';
import { PATH } from '@/constants/paths';

/**
 * 내가 작성한 방자랑 삭제
 */
export const useTalkDeleteMutation = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: TalkDeleteFetchParams) => talkDeleteFetch(params),
    onSuccess: () => {
      toast({
        title: '혼잣말이 삭제되었습니다.',
        icon: <CheckCircle />,
        className: TOAST.success,
      });
      navigate(PATH.talk);
      queryClient.invalidateQueries({ queryKey: ['@talkList'] });
    },
  });
  return mutation;
};
