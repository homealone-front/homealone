import { CheckCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { MemberLeavePatchFetchParams, memberLeavePatchFetch } from '@/api/member/memberLeavePatchFetch';

import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';

import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/paths';

import { useUserStore } from '@/store/useUserStore';

/**
 * 회원 탈퇴
 */
export const useLeaveMutation = () => {
  const { toast } = useToast();

  const navigate = useNavigate();
  const goHome = () => navigate(PATH.root);

  const removeUserInfo = useUserStore((state) => state.removeUserInfo);

  const mutation = useMutation({
    mutationFn: (params: MemberLeavePatchFetchParams) => memberLeavePatchFetch(params),
    onSuccess: () => {
      toast({
        title: '회원 탈퇴가 완료되었습니다.',
        icon: <CheckCircle />,
        className: TOAST.success,
      });

      goHome();
      removeUserInfo();
    },
  });
  return mutation;
};
