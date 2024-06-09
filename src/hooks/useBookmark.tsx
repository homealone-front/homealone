import { useToast } from '@/hooks/useToast';
import { isAxiosError } from 'axios';
import { CircleCheck, CircleXIcon } from 'lucide-react';
import { TOAST } from '@/constants/toast';
import { useRecipeDetailQuery } from '@/services/recipe/useRecipeDetailQuery';

export const useBookmark = (id: string) => {
  const { toast } = useToast();
  const { data, refetch: recipeDetailRefetch } = useRecipeDetailQuery({ id });

  const handleBookmark = async () => {
    try {
      // api 작업 완료 후 수정 필요
      //   if (data.isBookmark) {
      //     await bookmarkDeleteFetch();
      //   } else {
      //     await bookmarkPostFetch();
      //   }
      await recipeDetailRefetch();
      console.info(data);
      toast({
        title: '게시물이 저장되었습니다.',
        icon: <CircleCheck />,
        className: TOAST.success,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: error?.response?.data.message || '게시물 저장 실패',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  };

  return { handleBookmark };
};
