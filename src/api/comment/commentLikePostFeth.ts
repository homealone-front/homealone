import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface CommentLikePostFetchParams {
  /**
   * 댓글 식별값
   */
  commentId: number;
}

export interface CommentLikeResponse extends ResponseModel {
  /**
   * 좋아요 식별값
   */
  id: number;

  /**
   * 멤버 식별값
   */
  memberId: number;

  /**
   * 댓글 좋아요 수
   */
  totalCount: number;
}

/**
 * 댓글 좋아요
 */
export const commentLikePostFetch = (commentId: CommentLikePostFetchParams) =>
  apiFetch.post<CommentLikeResponse>('/commentLikes', commentId);
