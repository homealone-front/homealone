import * as yup from 'yup';

import { REG_EXP } from '@/constants';

/**
 * 회원가입 유효성 검사 스키마
 */
export const registerSchema = yup.object().shape({
  /**
   * 이메일(아이디)
   */
  email: yup.string().required('이메일을 입력해주세요.').matches(REG_EXP.email, '이메일 형식에 맞지 않습니다.'),

  /**
   * 패스워드
   */
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .matches(REG_EXP.password, '비밀번호는 영어 대소문자, 특수문자 1개 이상을 포함한 8자리 이상입니다.')
    .min(8, '비밀번호는 최소 8자리 이상입니다.'),

  /**
   * 패스워드 확인
   */
  confirmPassword: yup
    .string()
    .required('비밀번호를 한 번 더 입력해주세요.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),

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
