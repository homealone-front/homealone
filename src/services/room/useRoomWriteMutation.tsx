import { CheckCircle, CircleXIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';

import { writeRoomPostFetch, WriteRoomPostFetchParams } from '@/api/room/writeRoomPostFetch';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/paths';

/**
 * 방자랑 작성
 */
export const useRoomWriteMutation = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: WriteRoomPostFetchParams) => writeRoomPostFetch(params),
    onSuccess: (response) => {
      toast({
        title: '방자랑이 작성되었습니다.',
        icon: <CheckCircle />,
        className: TOAST.success,
      });
      navigate(`${PATH.room}/${response.data.id}`);
      queryClient.invalidateQueries({ queryKey: ['@roomList'] });
    },
    onError: (error) => {
      console.error('방자랑 작성 실패', error);

      toast({
        title: '방자랑 작성을 실패했습니다.',
        icon: <CircleXIcon />,
        className: TOAST.error,
      });
    },
  });
  return mutation;
};
