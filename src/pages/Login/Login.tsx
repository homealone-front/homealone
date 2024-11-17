import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isAxiosError } from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/Input';

import { PATH } from '@/constants/paths';

import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';

import { MemberLoginPostFetchParams, memberLoginPostFetch } from '@/api/member/memberLoginPostFetch';

import { loginSchema } from './validator';

import { useUserStore } from '@/store/useUserStore';
import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';
import { CircleCheck, CircleXIcon } from 'lucide-react';

import { memberInfoGetFetch } from '@/api/member/memberInfoGetFetch';

import { SocialLoginButton } from '@/components/SocialLoginButton';
import { KakaoAuthUrlGetFetch } from '@/api/member/kakaoAuthUrlGetFetch';
import { naverAuthUrlGetFetch } from '@/api/member/naverAuthUrlGetFetch';
import dayjs from 'dayjs';
import { googleAuthUrlGetFetch } from '@/api/member/googleAuthUrlGetFetch';

const Login = () => {
  const navigate = usePageMoveHandler();

  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const { toast } = useToast();

  const method = useForm({
    resolver: yupResolver(loginSchema),
    values: {
      email: '',
      password: '',
    } as MemberLoginPostFetchParams,
  });

  const {
    handleSubmit: submit,
    control,
    getValues,
    formState: { errors },
  } = method;

  const handleSubmit = submit(async () => {
    try {
      const loginParams = getValues();

      const loginRes = await memberLoginPostFetch(loginParams);

      const { data } = loginRes;

      setAccessToken(data.accessToken);

      const userInfoRes = await memberInfoGetFetch();

      setUserInfo({ ...userInfoRes.data, birth: dayjs(userInfoRes.data.birth).format('YYYYMMDD') });

      toast({
        title: data.message || '로그인 성공',
        icon: <CircleCheck />,
        className: TOAST.success,
      });

      navigate(PATH.root);
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        toast({
          title: error?.response?.data.message || '로그인 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  });

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
  // console.info('파라미터 확인', getValues());

  return (
    <>
      <div className="max-w-lg w-full m-auto pt-4">
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-semibold text-center text-primary">로그인</h3>
          <p className="text-lg text-center text-gray400">이메일로 로그인</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            control={control}
            name="email"
            type="text"
            label="이메일"
            placeholder="example@example.com"
            error={errors?.email}
          />

          <Input
            control={control}
            name="password"
            type="password"
            label="비밀번호"
            placeholder="영어 대소문자, 특수문자 1자를 포함"
            error={errors?.password}
          />

          <Button type="submit" className="w-full mt-4">
            로그인
          </Button>
        </form>

        <div className="w-full h-[1px] bg-gray-200 mt-8"></div>
        <p className="text-sm text-center text-gray400 my-4">또는</p>

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

        <div className="mt-8 font-light text-center">
          아직 회원이 아니신가요?{' '}
          <span onClick={() => navigate(PATH.register)} className="ml-2 underline cursor-pointer text-blue500">
            회원가입
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
