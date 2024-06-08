import { useRef, ChangeEvent } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Layout } from '@/layout';

import { Appbar } from '@/components/Appbar';
import { Footer } from '@/components/Footer';

import { Input } from '@/components/Input';
import { AddressSearch } from '@/pages/Register/AddressSearch';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { memberSchema } from './validator';
import { useUserStore } from '@/store/useUserStore';
import { birthDateCleansing } from './util';
// import { patchMemberDataCleansing } from './util';
// import { memberInfoPatchFetch } from '@/api/member/memberInfoPatchFetch';

export type MemberSchemaType = yup.InferType<typeof memberSchema>;

/**
 * 마이페이지 컴포넌트
 */

/**
 * @todo 회원데이터바인딩(lastAddress), 변경사항 저장, 회원탈퇴 api
 */
const Mypage = () => {
  const id = useUserStore((state) => state.id) as number;
  const name = useUserStore((state) => state.name) as string;
  const email = useUserStore((state) => state.email) as string;
  const address = useUserStore((state) => state.address) as string;
  const imageUrl = useUserStore((state) => state.image_url) as string;
  const birth = useUserStore((state) => state.birth) as string;

  const method = useForm<MemberSchemaType>({
    resolver: yupResolver(memberSchema),
    defaultValues: {
      id: id,
      image: { image: null, imageUrl: imageUrl },
      name: name,
      email: email,
      birth: birthDateCleansing(birth),
      firstAddress: address,
      lastAddress: address,
    },
  });

  const {
    handleSubmit: submit,
    control,
    setValue,
    // getValues,
    clearErrors,
    watch,
    formState: { isSubmitting, errors },
  } = method;

  const handleSubmit = submit(async () => {
    try {
      // const params = await patchMemberDataCleansing(getValues());
      // const response = await memberInfoPatchFetch(params);
      //@todo fix patch fetch 403에러
    } catch (error) {
      console.error(error);
    }
  });

  const values = watch();

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = () => {
    uploadRef.current?.click();
    clearErrors('image');
  };

  const handleRemoveImage = () => {
    setValue(`image.image`, null);
    setValue(`image.imageUrl`, null);
    clearErrors('image');
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];
      setValue(`image.image`, uploadFile);

      const imageUrl = URL.createObjectURL(uploadFile);
      setValue(`image.imageUrl`, imageUrl);
    }
  };

  const handleChangeAddress = (addr: string) => {
    setValue('firstAddress', addr);

    if (errors?.firstAddress) {
      clearErrors('firstAddress');

      return;
    }
  };

  return (
    <>
      <Appbar />
      <Layout>
        <div className="flex flex-row items-center gap-6 mb-16">
          <img src="/icons/arrow_svg_rightdown.svg" alt="arrow_icon" />
          <span className="text-xl font-semibold text-gray-800">나의 정보</span>
        </div>

        <div className="flex gap-10">
          <div className="min-w-[53.25rem] mx-auto">
            <form className="flex flex-col text-gray-600 border-b-[0.063rem] border-gray-200" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-9 w-full">
                <div className="flex flex-col w-48">
                  <Label className="mb-2" htmlFor="img">
                    프로필 이미지
                  </Label>
                  <Avatar className="w-[6.25rem] h-[6.25rem] my-4">
                    <AvatarImage src={values.image.imageUrl || 'https://github.com/shadcn.png'} alt="프로필 이미지" />
                    <AvatarFallback>nickname state</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-row gap-1">
                    <Button variant="outline" onClick={handleUploadImage}>
                      이미지 변경
                    </Button>
                    <input
                      ref={uploadRef}
                      className="hidden"
                      accept="image/*"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <Button variant="ghost" onClick={handleRemoveImage}>
                      삭제
                    </Button>
                  </div>
                </div>

                <Input
                  name="name"
                  value={values.name}
                  control={control}
                  type="text"
                  label="닉네임"
                  error={errors?.name}
                />
                <Input
                  name="birth"
                  value={values.birth}
                  control={control}
                  type="text"
                  extractNumber={true}
                  label="생년월일"
                  placeholder="YYYYMMDD"
                  maxLength={8}
                  error={errors?.birth}
                />
                <Input
                  name="email"
                  value={values.email}
                  control={control}
                  type="email"
                  extractNumber={false}
                  label="이메일"
                  placeholder="example@example.com"
                  addon={{
                    buttonText: '중복확인',
                    color: '#000',
                    onSubmit: () => {},
                  }}
                  error={errors?.email}
                />
                <AddressSearch
                  name="firstAddress"
                  lastName="lastAddress"
                  control={control}
                  errors={errors?.firstAddress as FieldError}
                  onAddressChange={handleChangeAddress}
                />
              </div>

              <div className="ml-auto my-9">
                <Button type="submit" disabled={isSubmitting}>
                  변경 사항 저장
                </Button>
              </div>
            </form>

            <div className="flex py-9 mb-20">
              <div>
                <div className="text-sm mb-0.5 text-gray-600">회원탈퇴</div>
                <span className="text-sm text-gray-400">
                  탈퇴 시 작성하신 게시글 및 댓글이 모두 삭제되며 복구되지 않습니다.
                </span>
              </div>
              <Button className="ml-auto" variant="destructive">
                회원탈퇴
              </Button>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Mypage;
