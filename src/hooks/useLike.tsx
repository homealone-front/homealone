import { isAxiosError } from 'axios';
import { useRecipeDetailQuery } from '@/services/recipe/useRecipeDetailQuery';

export const useLikes = (id: string) => {
  const { data, refetch: recipeDetailRefetch } = useRecipeDetailQuery({ id });

  const handleLikes = async () => {
    try {
      // api 작업 완료 후 수정 필요
      //   if (data.isLike) {
      //     await likekDeleteFetch();
      //   } else {
      //     await likePostFetch();
      //   }
      await recipeDetailRefetch();
      console.info(data);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error?.response?.data.message || '좋아요 실패');
      }
    }
  };

  return { handleLikes };
};
