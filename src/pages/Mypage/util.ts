import dayjs from 'dayjs';
import { MemberSchemaType } from './Mypage';
import { uploadImage } from '@/utils/uploadImage';
import { resizeAndConvertToWebp } from '@/utils/resizeAndConvertToWebp';

/**
 * 회원정보수정 fetch 파라미터를 포맷팅한다.
 */
export const patchMemberDataCleansing = async (data: MemberSchemaType) => {
  const { image, birth, ...rest } = data;

  const resizedImage = await resizeAndConvertToWebp(image.image as File, { width: 100, height: 100 });
  const cleansingImage = await uploadImage(resizedImage as File);

  return {
    ...rest,
    imageUrl: cleansingImage?.imageUrl || '',
    birth: dayjs(birth).format('YYYY-MM-DD'),
  };
};

/**
 * 회원정보(생년월일)의 초기값을 포맷팅한다.
 */
export const birthDateCleansing = (birth: string) => {
  return dayjs(birth).format('YYYYMMDD');
};
