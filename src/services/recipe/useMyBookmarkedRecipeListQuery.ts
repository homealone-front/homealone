import { useQuery } from '@tanstack/react-query';

import {
  myBookmarkedRecipeListGetFetch,
  MyBookmarkedRecipeListGetFetchParams,
} from '@/api/recipe/myBookmarkedRecipeListGetFetch';

import { COOK_TIME } from '@/pages/RecipeWrite/constants';

/**
 *내가 저장한 레시피 조회
 */
export const useMyBookmarkedRecipeListQuery = (params: MyBookmarkedRecipeListGetFetchParams) =>
  useQuery({
    queryKey: ['@my-bookmarked-recipeList', params],
    queryFn: async () => {
      const res = await myBookmarkedRecipeListGetFetch(params);

      const { data } = res;

      const { totalElements, totalPages, pageable, content } = data;

      return {
        totalElements,
        totalPages,
        pageable,
        content: [
          ...content.map((item) => {
            const matchingCookTime = COOK_TIME.find((cookTime) => cookTime.param === item.recipeTime);

            return {
              ...item,
              recipeTime: matchingCookTime ? matchingCookTime.value : item.recipeTime.toString(),
            };
          }),
        ],
      };
    },
    staleTime: 5000,
  });
