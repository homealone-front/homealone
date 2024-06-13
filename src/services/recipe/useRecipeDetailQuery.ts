import { useQuery } from '@tanstack/react-query';
import { recipeDetailGetFetch, RecipeDetailGetFetchParams } from '@/api/recipe/recipeDetailGetFetch';

/**
 * 레시피 상세 조회
 */
export const useRecipeDetailQuery = ({ id }: RecipeDetailGetFetchParams) =>
  useQuery({
    queryKey: ['@recipe-detail', id],
    queryFn: async () => {
      const res = await recipeDetailGetFetch({ id });

      const { data } = res;

      return data;
    },
    enabled: !!id,
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });
