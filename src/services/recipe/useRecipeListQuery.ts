import { useQuery } from '@tanstack/react-query';

import { recipeListGetFetch, RecipeListGetFetchParmas } from '@/api/reciepe/recipeListGetFetch';

import { COOK_TIME } from '@/pages/ReciepeWrite/constants';

/**
 * 레시피 전체 조회
 */
export const useRecipeListQuery = (params: RecipeListGetFetchParmas) =>
  useQuery({
    queryKey: ['@recipeList', params],
    queryFn: async () => {
      const res = await recipeListGetFetch(params);

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
    select: (data) => ({
      ...data,
      totalPages: data.totalPages,
    }),
    staleTime: 5000,
  });
