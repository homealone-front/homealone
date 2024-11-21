import { isAxiosError } from 'axios';
import { CircleXIcon } from 'lucide-react';

import { KakaoAuthUrlGetFetch } from '@/api/member/kakaoAuthUrlGetFetch';
import { naverAuthUrlGetFetch } from '@/api/member/naverAuthUrlGetFetch';
import { googleAuthUrlGetFetch } from '@/api/member/googleAuthUrlGetFetch';
import { SocialLoginButton } from '@/components/SocialLoginButton';
import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';

/**
 * 소셜 로그인 버튼들 ( 카카오, 네이버, 구글 )
 */

const SocialLoginButtons = () => {
  const { toast } = useToast();

  const handleKakaoLogin = async () => {
    try {
      const urlResponse = await KakaoAuthUrlGetFetch();

      const kakaoUrl = document.createElement('a');

      kakaoUrl.setAttribute('href', urlResponse.data);

      kakaoUrl.click();
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        toast({
          title: error?.response?.data.message || '카카오 로그인 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  };

  const handleNaverLogin = async () => {
    try {
      const urlResponse = await naverAuthUrlGetFetch();

      const naverUrl = document.createElement('a');

      naverUrl.setAttribute('href', urlResponse.data);

      naverUrl.click();
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        toast({
          title: error?.response?.data.message || '네이버 로그인 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const urlResponse = await googleAuthUrlGetFetch();

      const naverUrl = document.createElement('a');

      naverUrl.setAttribute('href', urlResponse.data);
      naverUrl.click();
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        toast({
          title: error?.response?.data.message || '구글 로그인 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <SocialLoginButton onSubmit={handleKakaoLogin} variant="kakao">
        <img src={'/icons/kakaologo.svg'} alt={'naver-logo'} />
        카카오로 시작하기
      </SocialLoginButton>
      <SocialLoginButton onSubmit={handleNaverLogin} variant="naver">
        <img className="h-full" src={'/icons/naverlogo.png'} alt={'naver-logo'} />
        네이버로 시작하기
      </SocialLoginButton>
      <SocialLoginButton onSubmit={handleGoogleLogin} variant="google">
        <img src={'/icons/google_logo.svg'} alt={'google-logo'} />
        구글로 시작하기
      </SocialLoginButton>
    </div>
  );
};

export default SocialLoginButtons;
