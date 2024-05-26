import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Layout } from '@/layout';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/Input';
import { Appbar } from '@/components/Appbar';

import { PATH } from '@/constants/paths';

import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';

import { MemberLoginPostFetchParams } from '@/api/member/memberLoginPostFetch';

import { loginSchema } from './validator';

const Login = () => {
  const navigate = usePageMoveHandler();

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
    // setValue,
    // trigger,
    // watch,
    formState: { errors },
  } = method;

  const handleSubmit = submit(async () => {
    try {
      navigate(PATH.root);
    } catch (error) {
      console.error(error);
    }
  });

  console.info('파라미터 확인', getValues());

  return (
    <>
      <Appbar />
      <Layout>
        <div className="w-[30rem] m-auto pt-10">
          <div className="mb-14">
            <h3 className="text-2xl text-center text-primary font-semibold mb-6">로그인</h3>
            <p className="text-lg text-center text-gray400">이메일로 로그인</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <Input
                control={control}
                name="email"
                type="text"
                extractNumber={true}
                label="이메일"
                placeholder="example@example.com"
                error={errors?.email}
              />
            </div>

            <div className="my-8">
              <Input
                control={control}
                name="password"
                type="password"
                extractNumber={false}
                label="비밀번호"
                placeholder="영어 대소문자, 특수문자 1자를 포함"
                error={errors?.password}
              />
            </div>

            <Button className="w-full" type="submit">
              로그인
            </Button>
          </form>
          <div className="text-center mt-8 font-light">
            아직 회원이 아니신가요?{' '}
            <span onClick={() => navigate(PATH.register)} className="ml-2 underline text-blue500 cursor-pointer">
              회원가입
            </span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
