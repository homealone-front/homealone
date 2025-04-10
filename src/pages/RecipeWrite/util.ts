import { COOK_TIME, RECIPE_TYPE, PORTIONS, FOOD_CATEGORIES } from './constants';
import { uploadImage } from '@/utils/uploadImage';
import { WriteRecipePostFetchParams } from '@/api/recipe/writeRecipePostFetch';
import { RecipeSchemaType } from './RecipeWrite';
import { RecipeDetailResponse } from '@/api/recipe/recipeDetailGetFetch';
import { resizeAndConvertToWebp } from '@/utils/resizeAndConvertToWebp';

/**
 * 레시피 수정 및 등록 파라미터를 포맷팅한다.
 */
export const getRecipeCleansingData = async (data: RecipeSchemaType) => {
  const { images = [], details = [], ...rest } = data;

  /**
   * 대표이미지를 업로드하고 params 형식에 맞춘다.
   */
  const cleansingMainImage = (await Promise.all(
    images.map(async (item) => {
      if (item.image instanceof File) {
        const resizedImage = await resizeAndConvertToWebp(item.image, { height: 224 });
        const uploadedImage = await uploadImage(resizedImage as File);

        return {
          ...uploadedImage,
        };
      }

      return {
        ...item,
      };
    }),
  )) as PropType<WriteRecipePostFetchParams, 'images'> & RecipeDetailResponse;

  /**
   * 조리순서에 등록된 이미지들을 업로드하고 params 형식에 맞춘다.
   */
  const cleansingDetailsImage = await Promise.all(
    details.map(async (item) => {
      if (item.image instanceof File) {
        const uploadedImage = await uploadImage(item.image);

        return {
          description: item.description,
          ...uploadedImage,
        };
      }

      return {
        ...item,
        description: item.description,
      };
    }),
  );

  return {
    ...rest,
    cuisine: FOOD_CATEGORIES.find((c) => c.value === rest.cuisine)?.param as string,
    recipeTime: COOK_TIME.find((t) => t.value === rest.recipeTime)?.param as string,
    recipeType: RECIPE_TYPE.find((t) => t.value === rest.recipeType)?.param as string,
    ingredients: rest.ingredients.map((item) => ({
      ...item,
      quantity: parseInt(item.quantity, 10),
    })),
    portions: PORTIONS.find((p) => p.value === rest.portions)?.param as number,
    images: [...cleansingMainImage],
    details: [...cleansingDetailsImage],
  };
};
