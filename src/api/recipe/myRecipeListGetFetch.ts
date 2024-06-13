import { apiFetch } from '../common';
import { RecipeListResponse, RecipeListGetFetchParmas } from '@/api/reciepe/recipeListGetFetch';

export interface MyRecipeListGetFetchParmas extends RecipeListGetFetchParmas {}
export interface MyRecipeListResponse extends RecipeListResponse {}

/**
 * 내가 작성한 레시피 게시글 조회 (페이지네이션)
 */
export const myRecipeListGetFetch = (params: MyRecipeListGetFetchParmas) => {
  const { page = 0, size = 20 } = params;

  return apiFetch.get<MyRecipeListResponse>(`/mypage/me/recipes?page=${page}&size=${size}&sort=createdAt,desc`);
};
