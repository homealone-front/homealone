import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { CheckCircle, CircleXIcon } from 'lucide-react';

import { useUserStore } from '@/store/useUserStore';

import { memberLogoutGetFetch } from '@/api/member/memberLogoutGetFetch';

import { useToast } from '@/hooks/useToast';

import { PATH } from '@/constants/paths';
import { TOAST } from '@/constants/toast';

export const useLogout = () => {
  const navigate = useNavigate();

  const removeUserInfo = useUserStore((state) => state.removeUserInfo);

  const { toast } = useToast();

  const logout = async () => {
    try {
      const logoutRes = await memberLogoutGetFetch();

      removeUserInfo();

      toast({
        title: logoutRes.data.message || '로그아웃 성공',
        icon: <CheckCircle />,
        className: TOAST.success,
      });

      navigate(PATH.root);
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        const { response } = error;

        toast({
          title: response?.data.message || response?.data.error || '로그아웃 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  };

  return logout;
};
