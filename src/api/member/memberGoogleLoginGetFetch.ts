import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface MemberGoogleLoginPostFetchParams {
  code: string;
}

export interface MemberGoogleLoginResponse extends ResponseModel {
  accessToken: string;
}

/**
 * 구글 로그인
 */
export const memberGoogleLoginPostFetch = (params: MemberGoogleLoginPostFetchParams) =>
  apiFetch.post<MemberGoogleLoginResponse>('/google/callback', params);
