import { CheckCircle, CircleXIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';

import { roomEditPatchFetch, RoomEditPatchFetchParams } from '@/api/room/roomEditPatchFetch';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/paths';

/**
 * 내가 작성한 방자랑 수정
 */
export const useRoomEditMutation = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: RoomEditPatchFetchParams) => roomEditPatchFetch(params),
    onSuccess: (response) => {
      toast({
        title: '방자랑이 수정되었습니다.',
        icon: <CheckCircle />,
        className: TOAST.success,
      });
      navigate(`${PATH.room}/${response.data.id}`);
      queryClient.invalidateQueries({ queryKey: ['@roomList'] });
    },
    onError: (error) => {
      console.error('방자랑 수정 실패', error);

      toast({
        title: '방자랑 수정을 실패했습니다.',
        icon: <CircleXIcon />,
        className: TOAST.error,
      });
    },
  });
  return mutation;
};
