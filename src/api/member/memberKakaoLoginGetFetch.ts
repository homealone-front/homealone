import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface MemberKakaoLoginPostFetchParams {
  accessToken: string;
}

export interface MemberKakaoLoginResponse extends ResponseModel {
  accessToken: string;
}

/**
 * 카카오 로그인
 */
export const memberKakaoLoginPostFetch = (params: MemberKakaoLoginPostFetchParams) =>
  apiFetch.post<MemberKakaoLoginResponse>('/kakao/login', params);
