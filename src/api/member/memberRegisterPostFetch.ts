import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface MemberRegisterPostFetchParams {
  /**
   * 사용할 닉네임(이름)
   */
  name: string;

  /**
   * 생년월일
   * - YYYY-MM-DD
   */
  birth: string;

  /**
   * 이메일
   */
  email: string;

  /**
   * 주소
   * - firstAddress + lastAddress
   */
  firstAddress: string;

  secondAddress?: string;

  /**
   * 패스워드
   */
  password: string;
}

export interface MemberRegisterResponse extends ResponseModel {}

/**
 * 회원가입 api
 */
export const memberRegisterPostFetch = (params: MemberRegisterPostFetchParams) =>
  apiFetch.post<MemberRegisterResponse>('/signup', params);
