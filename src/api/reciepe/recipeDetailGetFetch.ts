import { apiFetch } from '../common';
import { ResponseModel } from '../model';
import { WriteReciepePostFetchParams } from './writeReciepePostFetch';

export interface RecipeDetailGetFetchParams {
  /**
   * 게시물 아이디
   */
  id: string;
}

export interface RecipeDetailResponse extends ResponseModel, WriteReciepePostFetchParams {
  /**
   * 게시물 작성자 식별값
   */
  userId: number;

  /**
   * 게시물 작성자 닉네임
   */
  userName: string;

  postTags: {
    tagName: string;
  }[];

  relatedDto: {
    likeCount: number;
    scrapCount: number;
    likeByCurrentUser: boolean;
    bookmarked: boolean;
  };
}

/**
 * 레시피 상세조회ㅏ
 */
export const recipeDetailGetFetch = ({ id }: RecipeDetailGetFetchParams) =>
  apiFetch.get<RecipeDetailResponse>(`/recipes/${id}`);
