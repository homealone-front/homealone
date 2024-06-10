import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Layout } from '@/layout';

import { Appbar } from '@/components/Appbar';
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { AddressSearch } from './AddressSearch';

import { usePageMoveHandler } from '@/hooks/usePageMoveHandler';

import { PATH } from '@/constants/paths';

import { registerSchema } from './validator';
import { getRegisterDataCleansing } from './util';
import { useToast } from '@/hooks/useToast';
import { isAxiosError } from 'axios';
import { CircleCheck, CircleXIcon } from 'lucide-react';
import { TOAST } from '@/constants/toast';
import { doubleCheckEmailGetFetch } from '@/api/member/doubleCheckEmailGetFetch';
import { memberRegisterPostFetch } from '@/api/member/memberRegisterPostFetch';

export type RegisterSchemaType = yup.InferType<typeof registerSchema>;

const Register = () => {
  const navigate = usePageMoveHandler();
  const { toast } = useToast();

  const method = useForm<RegisterSchemaType>({
    resolver: yupResolver(registerSchema),
    values: {
      email: '',
      birth: '',
      name: '',
      password: '',
      confirmPassword: '',
      firstAddress: '',
      lastAddress: '',
    },
  });

  const {
    handleSubmit: submit,
    control,
    trigger,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = method;

  const handleSubmit = submit(async () => {
    try {
      const { data } = await memberRegisterPostFetch(getRegisterDataCleansing(getValues()));

      toast({
        title: data.message || '회원가입 성공',
        icon: <CircleCheck />,
        className: TOAST.success,
      });

      navigate(PATH.login);
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.message || '회원가입 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });

        return;
      }
    }
  });

  const handleDoubleCheckEmail = async () => {
    try {
      if (!(await trigger('email'))) return;

      const email = getValues('email');

      const { data } = await doubleCheckEmailGetFetch({ email });

      toast({
        title: data.message || '사용 가능한 이메일 입니다.',
        icon: <CircleCheck />,
        className: TOAST.success,
      });
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        toast({
          title: error?.response?.data.message || '중복확인 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  };

  return (
    <>
      <Appbar />
      <Layout>
        <div className="w-[30rem] m-auto py-10">
          <div className="mb-14">
            <h3 className="text-2xl text-center text-primary font-semibold mb-6">환영합니다</h3>
            <p className="text-lg text-center text-gray400">회원가입 하기</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                name="email"
                control={control}
                type="email"
                extractNumber={false}
                label="이메일"
                placeholder="example@example.com"
                error={errors?.email}
                addon={{
                  buttonText: '중복확인',
                  color: '#000',
                  onSubmit: handleDoubleCheckEmail,
                }}
              />
            </div>
            <div className="my-8">
              <Input
                name="name"
                control={control}
                type="text"
                extractNumber={false}
                label="이름"
                placeholder="홍길동"
                error={errors?.name}
              />
            </div>
            <div className="my-8">
              <Input
                name="birth"
                control={control}
                type="text"
                extractNumber={true}
                label="생년월일"
                placeholder="YYYYMMDD"
                maxLength={8}
                error={errors?.birth}
              />
            </div>
            <div className="my-8">
              <Input
                name="password"
                control={control}
                type="password"
                extractNumber={false}
                label="비밀번호"
                placeholder="영어 대소문자, 특수문자 1자를 포함"
                error={errors?.password}
              />
            </div>
            <div className="my-8">
              <Input
                name="confirmPassword"
                control={control}
                type="password"
                extractNumber={false}
                label="비밀번호 확인"
                placeholder="비밀번호 재입력"
                error={errors?.confirmPassword}
              />
            </div>
            <AddressSearch
              name="firstAddress"
              lastName="lastAddress"
              control={control}
              errors={errors?.firstAddress as FieldError}
              onAddressChange={(addr) => {
                setValue('firstAddress', addr);

                if (errors?.firstAddress) {
                  clearErrors('firstAddress');

                  return;
                }
              }}
            />

            <Button className="w-full my-8" type="submit">
              회원가입 하기
            </Button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
