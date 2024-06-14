import { RecipeSchemaType } from './RecipeEdit';
import { COOK_TIME, RECIPE_TYPE, PORTIONS, FOOD_CATEGORIES } from './constants';

import { RecipeDetailResponse } from '@/api/recipe/recipeDetailGetFetch';

/**
 * 레시피 수정, 서버 데이터를 클라이언트 데이터로 포맷팅한다.
 */
export const getRecipeDetailDataCleansing = (data: RecipeDetailResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, postTags, userId, userName, relatedDto, view, ...rest } = data;

  return {
    ...rest,
    cuisine: FOOD_CATEGORIES.find((item) => item.param === rest.cuisine)?.item,
    recipeType: RECIPE_TYPE.find((item) => item.param === rest.recipeType)?.item,
    recipeTime: COOK_TIME.find((item) => item.param === rest.recipeTime)?.item,
    portions: PORTIONS.find((item) => item.param === rest.portions)?.item,
    images: [
      {
        ...rest.images[0],
        image: {} as File,
        imageUrl: rest.images[0].imageUrl,
      },
    ],
    details: rest.details.map((item) => ({
      image: {} as File,
      fileName: item.fileName,
      imageUrl: item.imageUrl ?? '',
      description: item.description ?? '',
    })),
    ingredients: rest.ingredients.map((item) => ({
      name: item.name,
      unit: item.unit,
      quantity: item.quantity.toString(),
    })),
  } as RecipeSchemaType;
};
