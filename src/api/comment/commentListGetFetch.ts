import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface CommentListGetFetchParams {
  /**
   * 게시물 식별값
   */
  postId: string;
}

export interface CommentListResponse extends ResponseModel {
  /**
   * 댓글 식별값
   */
  id: number;

  /**
   * 게시물 식별값
   */
  postId: number;

  /**
   * 댓글 작성자 식별값
   */
  memberId: number;

  /**
   * 댓글 단 사람
   */
  memberName: string;

  /**
   * 댓글
   */
  content: string;

  /**
   * 댓글 작성 및 수정 시간
   */
  modifiedAt: string;
}

/**
 * 댓글 조회
 */
export const commentListGetFetch = ({ postId }: CommentListGetFetchParams) =>
  apiFetch.get<CommentListResponse[]>(`/comments/${postId}`);
