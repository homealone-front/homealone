import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { memberInfoGetFetch } from '@/api/member/memberInfoGetFetch';

import { useUserStore } from '@/store/useUserStore';

import { PATH } from '@/constants/paths';
import { TOAST } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';
import { CircleCheck, CircleXIcon } from 'lucide-react';
import { isAxiosError } from 'axios';
import { Spinner } from '@/components/Spinner';
import { memberNaverLoginPostFetch } from '@/api/member/memberNaverLoginPostFetch';
import dayjs from 'dayjs';

const NaverCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { toast } = useToast();

  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    const call = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        if (code) {
          const naverLoginResponse = await memberNaverLoginPostFetch({ code });

          setAccessToken(naverLoginResponse.data.accessToken);

          const userInfoResponse = await memberInfoGetFetch();

          setUserInfo({
            ...userInfoResponse.data,
            birth: !userInfoResponse.data.birth ? '' : dayjs(userInfoResponse.data.birth).format('YYYYMMDD'),
          });

          toast({
            title: '네이버로 로그인 했어요!',
            icon: <CircleCheck />,
            className: TOAST.success,
          });

          navigate(PATH.root);
        }
      } catch (error) {
        console.error(error);

        if (isAxiosError(error)) {
          toast({
            title: '네이버 로그인에 실패했어요 ...',
            icon: <CircleXIcon />,
            className: TOAST.error,
          });

          navigate(PATH.login);
        }
      }
    };

    call();
  }, [location.search]);

  return <Spinner>로그인 중이에요 ...</Spinner>;
};

export default NaverCallback;
