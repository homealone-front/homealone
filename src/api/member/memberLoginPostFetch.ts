import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface MemberLoginPostFetchParams {
  /**
   * 이메일
   */
  email: string;

  /**
   * 패스워드
   */
  password: string;
}

export interface MemberLoginResponse extends ResponseModel {
  /**
   * accessToken 액세스 토큰
   */
  accessToken: string;
}

/**
 * 로그인 api
 */
export const memberLoginPostFetch = (params: MemberLoginPostFetchParams) =>
  apiFetch.post<MemberLoginResponse>('/login', params);
