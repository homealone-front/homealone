import { apiFetch } from '../common';
import { ResponseModel } from '../model';
import { CommentListResponse } from './commentListGetFetch';

export interface MyCommentListGetFetchParams {
  /**
   * 요청할 페이지 번호
   * - 0 이 1번째
   */
  page?: number;

  /**
   * 한 페이지에 표시할 게시물의 수
   */
  size?: number;
}

export interface MyCommentListResponse extends ResponseModel {
  content: CommentListResponse[];

  /**
   * 페이지네이션
   */
  pageable: {
    /**
     * 현재 페이지
     */
    pageNumber: 0;

    /**
     * 호출한 페이지별 아이템 갯수
     */
    pageSize: 20;
  };

  /**
   * 총 게시물 갯수
   */
  totalElements: number;

  /**
   * 총 페이지 갯수
   */
  totalPages: number;
}

/**
 * 내가 작성한 댓글 조회 (페이지네이션)
 */
export const myCommentListGetFetch = (params: MyCommentListGetFetchParams) => {
  const { page = 0, size = 20 } = params;

  return apiFetch.get<MyCommentListResponse>(`/mypage/me/comments?page=${page}&size=${size}&sort=createdAt,desc`);
};
