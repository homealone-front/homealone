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
   * 프로필 이미지
   */
  imageUrl: string;

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

  /**
   * 좋아요 수
   */
  likeCount: number;

  /**
   * 게시글 제목
   */
  postTitle: string;

  /**
   * 게시글 작성자 닉네임
   */
  postMemberName: string;

  /**
   * 게시글 종류
   */
  postType: 'RECIPE' | 'ROOM' | 'TALK' | 'USEDTRADE';
}

/**
 * 댓글 조회
 */
export const commentListGetFetch = ({ postId }: CommentListGetFetchParams) =>
  apiFetch.get<CommentListResponse[]>(`/comments/${postId}`);
