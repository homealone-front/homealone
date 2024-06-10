import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface UpdateCommentPatchFetchParams {
  /**
   * 수정할 댓글 식별값
   */
  id: number;

  /**
   * 수정된 댓글
   */
  content: string;

  /**
   * 댓글이 달린 게시글 식별값
   */
  postId: number;
}

export interface UpdateCommentResponse extends ResponseModel {}

/**
 * 댓글 수정 api
 */
export const updateCommentPatchFetch = (params: UpdateCommentPatchFetchParams) =>
  apiFetch.patch<UpdateCommentResponse>('/comments', params);
