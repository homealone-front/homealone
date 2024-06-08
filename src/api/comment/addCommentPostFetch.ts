import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface AddCommentPostFetchParmas {
  /**
   * 댓글 input
   */
  content: string;

  /**
   * 게시물 식별값
   */
  postId: number;
}

export interface AddCommentResponse extends ResponseModel {}

/**
 * 댓글 등록
 */
export const addCommentPostFetch = (params: AddCommentPostFetchParmas) =>
  apiFetch.post<AddCommentResponse>('/comments', params);
