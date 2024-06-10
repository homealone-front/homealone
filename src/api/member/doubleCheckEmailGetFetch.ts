import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface DoubleCheckEmailGetFetchParmas {
  email: string;
}

export interface DoubleCheckEmailResponse extends ResponseModel {}

/**
 * 이메일 중복체크
 */
export const doubleCheckEmailGetFetch = ({ email }: DoubleCheckEmailGetFetchParmas) =>
  apiFetch.get(`/mypage/me/check-email?email=${email}`);
