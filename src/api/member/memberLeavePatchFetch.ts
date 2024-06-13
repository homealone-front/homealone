import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface MemberLeavePatchFetchParams {
  /**
   * 아이디
   */
  id: number;
}

export interface MemberLeavePatchResponse extends ResponseModel {}

/**
 * 회원 탈퇴 api
 */
export const memberLeavePatchFetch = (params: MemberLeavePatchFetchParams) =>
  apiFetch.patch<MemberLeavePatchResponse>('/mypage/me/withdrawal', params);
