import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/Input';

import { PATH } from '@/constants/paths';

import { MemberLoginFetchParams } from '@/api/member/memberLoginPostFetch';

import { loginSchema } from './validator';

const Login = () => {
  const navigate = useNavigate();

  const method = useForm({
    resolver: yupResolver(loginSchema),
    values: {
      email: '',
      password: '',
    } as MemberLoginFetchParams,
  });

  const {
    handleSubmit: submit,
    control,
    // getValues,
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

  return (
    <div className="w-[30rem] m-auto pt-10">
      <form onSubmit={handleSubmit}>
        <div>
          <Input<MemberLoginFetchParams>
            control={control}
            name="email"
            type="text"
            extractNumber={false}
            label="Email"
            placeholder="example@example.com"
            error={errors?.email}
          />
        </div>

        <div className="mt-2 mb-4">
          <Input<MemberLoginFetchParams>
            control={control}
            name="password"
            type="password"
            extractNumber={false}
            label="Password"
            placeholder="영어 대소문자, 특수문자 1자를 포함"
            error={errors?.password}
          />
        </div>

        <Button className="w-full" type="submit">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Login;
