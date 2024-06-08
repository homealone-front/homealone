import * as yup from 'yup';

import { REG_EXP } from '@/constants';

/**
 * 마이페이지 회원 정보 유효성 검사 스키마
 */
export const memberSchema = yup.object().shape({
  /**
   * 아이디
   */
  id: yup.number(),

  /**
   * 프로필 이미지
   */
  image: yup.object().shape({
    image: yup
      .mixed()
      .test('is-file', '프로필 이미지는 파일이어야 합니다.', (value) => {
        if (value) {
          return value instanceof File;
        }
        return true;
      })
      .notRequired(),
    imageUrl: yup.string().notRequired(),
  }),

  /**
   * 이메일
   */
  email: yup.string().required('이메일을 입력해주세요.').matches(REG_EXP.email, '이메일 형식에 맞지 않습니다.'),

  /**
   * 이름
   */
  name: yup
    .string()
    .required('이름 혹은 별칭을 입력해주세요.')
    .min(2, '닉네임은 2글자 이상입니다.')
    .max(8, '닉네임은 8글자 이하입니다.'),

  /**
   * 생년월일
   */
  birth: yup
    .string()
    .required('생년월일을 입력해주세요.')
    .matches(REG_EXP.yyyymmdd, '날짜 형식에 맞지 않습니다.')
    .min(8, '생년월일은 최소 8글자입니다. (YYYYMMDD)')
    .max(8, '생년월일은 최대 8글자입니다.'),

  /**
   * 주소 앞
   */
  firstAddress: yup.string().required('주소를 검색해주세요.'),

  /**
   * 주소 뒤
   */
  lastAddress: yup.string(),
});
