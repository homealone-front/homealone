import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface MemberLogoutResponse extends ResponseModel {}

/**
 * 로그아웃 Api
 */
export const memberLogoutGetFetch = () => apiFetch.get<MemberLogoutResponse>('/logout');
