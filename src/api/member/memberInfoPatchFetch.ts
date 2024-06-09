import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface MemberInfoPatchFetchParams {
  /**
   * 유저 아이디
   */
  id: number;

  /**
   * 프로필 이미지 url
   */
  image_url: string;

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
  address: string;
}

export interface MemberInfoPatchResponse extends ResponseModel {}

/**
 * 회원정보수정 api
 */
export const memberInfoPatchFetch = (params: MemberInfoPatchFetchParams) =>
  apiFetch.patch<MemberInfoPatchResponse>('/mypage/me', params);
