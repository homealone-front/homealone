import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface LikeParams {
  /**
   * 게시물 id
   */
  postId: number;
}

export interface LikeResponse extends ResponseModel {}

/**
 * 좋아요 추가/삭제
 */
export const likePostFetch = (params: LikeParams) => apiFetch.post<LikeResponse>(`/likes`, params);
