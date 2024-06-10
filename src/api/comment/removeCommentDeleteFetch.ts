import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface RemoveCommentDeleteFetchParams {
  /**
   * 삭제할 댓글 식별값
   */
  commentId: number;
}

export interface RemoveCommentResponse extends ResponseModel {}

/**
 * 댓글 삭제
 */
export const removeCommentDeleteFetch = ({ commentId }: RemoveCommentDeleteFetchParams) =>
  apiFetch.delete(`/comments/${commentId}`);
