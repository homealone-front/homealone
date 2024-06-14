import { apiFetch } from '../common';
import { RecipeListResponse, RecipeListGetFetchParams } from '@/api/recipe/recipeListGetFetch';

export interface MyBookmarkedRecipeListGetFetchParams extends RecipeListGetFetchParams {}
export interface MyBookmarkedRecipeListResponse extends RecipeListResponse {}

/**
 * 내가 저장한 레시피 게시글 조회 (페이지네이션)
 */
export const myBookmarkedRecipeListGetFetch = (params: MyBookmarkedRecipeListGetFetchParams) => {
  const { page = 0, size = 20 } = params;

  return apiFetch.get<MyBookmarkedRecipeListResponse>(
    `/mypage/me/scraps/recipes?page=${page}&size=${size}&sort=createdAt,desc`,
  );
};
