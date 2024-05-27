import { apiFetch } from '../common';
import { MemberResponseModel } from '../model';

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

export interface MemberLoginResponse extends MemberResponseModel {
  /**
   * accessToken
   */
  token: string;
}

/**
 * 로그인 api
 */
export const memberLoginPostFetch = (params: MemberLoginPostFetchParams) =>
  apiFetch.post<MemberLoginResponse>('/login', params);
