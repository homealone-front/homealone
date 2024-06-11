import { CheckCircle, CircleXIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';

import { MemberInfoPatchFetchParams, memberInfoPatchFetch } from '@/api/member/memberInfoPatchFetch';
import { memberInfoGetFetch } from '@/api/member/memberInfoGetFetch';

import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';

/**
 * 회원 정보 수정
 */
export const useMemberInfoMutation = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (params: MemberInfoPatchFetchParams) => memberInfoPatchFetch(params),
    onSuccess: async () => {
      const response = await memberInfoGetFetch();
      const { data } = response;
      setUserInfo(data);

      toast({
        title: '변경 사항이 저장되었습니다.',
        icon: <CheckCircle />,
        className: TOAST.success,
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: '회원 정보 수정에 실패했습니다.',
        icon: <CircleXIcon />,
        className: TOAST.error,
      });
    },
  });
  return mutation;
};
