import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface ScrapParams {
  /**
   * 게시물 id
   */
  postId: number;
}

export interface ScrapResponse extends ResponseModel {}

/**
 * 좋아요 추가/삭제
 */
export const scrapPostFetch = (params: ScrapParams) => apiFetch.post<ScrapResponse>(`/scraps`, params);
