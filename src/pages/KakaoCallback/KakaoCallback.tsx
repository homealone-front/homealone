import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { memberKakaoLoginPostFetch } from '@/api/member/memberKakaoLoginGetFetch';
import { memberInfoGetFetch } from '@/api/member/memberInfoGetFetch';

import { useUserStore } from '@/store/useUserStore';

import { PATH } from '@/constants/paths';
import { TOAST } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';
import { CircleCheck, CircleXIcon } from 'lucide-react';
import { isAxiosError } from 'axios';
import { Spinner } from '@/components/Spinner';

const KakaoCallback = () => {
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
          const kakaoLoginResponse = await memberKakaoLoginPostFetch({ code });

          setAccessToken(kakaoLoginResponse.data.accessToken);

          const userInfoResponse = await memberInfoGetFetch();

          const birth = !userInfoResponse.data.birth ? '' : dayjs(userInfoResponse.data.birth).format('YYYYMMDD');

          setUserInfo({ ...userInfoResponse.data, birth });

          toast({
            title: '카카오로 로그인 했어요!',
            icon: <CircleCheck />,
            className: TOAST.success,
          });

          navigate(PATH.root);
        }
      } catch (error) {
        console.error(error);

        if (isAxiosError(error)) {
          toast({
            title: '카카오 로그인에 실패했어요 ...',
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

export default KakaoCallback;
