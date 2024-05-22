import * as yup from 'yup';

import { REG_EXP } from '@/constants';

/**
 * 로그인 유효성 검사 스키마
 */
export const loginSchema = yup.object().shape({
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
});
