import { apiFetch } from '../common';
import { MemberResponseModel } from '../model';

export interface MemberLoginFetchParams {
  /**
   * 이메일
   */
  email: string;

  /**
   * 패스워드
   */
  password: string;
}

export interface UserLoginResponse extends MemberResponseModel {
  /**
   * accessToken
   */
  token: string;
}

/**
 * 로그인 api
 */
export const memberLoginPostFetch = (params: MemberLoginFetchParams) =>
  apiFetch.post<UserLoginResponse>('/login', params);
