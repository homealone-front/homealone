import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface MemberInfoResponse extends ResponseModel {
  /**
   * 유저 식별값
   */
  id: number;

  /**
   * 유저 이름
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
   */
  address: string;

  /**
   * 유저 프로필 이미지 url
   */
  image_url: string;

  /**
   * 회원가입 일자
   */
  created_at: string;

  /**
   * 회원정보 수정일자
   */
  modified_at: string;
}

/**
 * 유저정보 조회
 */
export const memberInfoGetFetch = () => apiFetch.get<MemberInfoResponse>('/mypage/me');
