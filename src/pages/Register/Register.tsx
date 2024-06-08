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

export type RegisterSchemaType = yup.InferType<typeof registerSchema>;

const Register = () => {
  const navigate = usePageMoveHandler();

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
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = method;

  const handleSubmit = submit(async () => {
    try {
      console.info(getRegisterDataCleansing(getValues()));

      navigate(PATH.root);
    } catch (error) {
      console.error(error);
    }
  });

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
                  onSubmit: () => {
                    //TODO: 이메일 중복확인 api 달기
                  },
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
                addon={{
                  buttonText: '중복확인',
                  color: '#000',
                  onSubmit: () => {
                    //TODO: 이름 중복확인 api 달기
                  },
                }}
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
