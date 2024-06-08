import { COOK_TIME, RECIEPE_TYPE, PORTIONS, FOOD_CATEGORIES } from './constants';
import { uploadImage } from '@/utils/uploadImage';
import { WriteReciepePostFetchParams } from '@/api/reciepe/writeReciepePostFetch';
import { ReciepeSchemaType } from './ReciepeWrite';

/**
 * 레시피등록 파라미터를 포맷팅한다.
 */
export const getReciepeCleansingData = async (data: ReciepeSchemaType) => {
  const { images = [], details = [], ...rest } = data;

  /**
   * 대표이미지를 업로드하고 params 형식에 맞춘다.
   */
  const cleasingMainImage = (await Promise.all(
    images.map(async (item) => {
      if (item.image instanceof File) {
        const uploadedImage = await uploadImage(item.image);

        return {
          ...uploadedImage,
        };
      }
    }),
  )) as PropType<WriteReciepePostFetchParams, 'images'>;

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
        description: item.description,
      };
    }),
  );

  return {
    ...rest,
    cuisine: FOOD_CATEGORIES.find((c) => c.value === rest.cuisine)?.param as string,
    reciepeTime: COOK_TIME.find((t) => t.value === rest.reciepeTime)?.param as string,
    reciepeType: RECIEPE_TYPE.find((t) => t.value === rest.reciepeType)?.param as string,
    ingredients: rest.ingredients.map((item) => ({
      ...item,
      quantity: parseInt(item.quantity, 10),
    })),
    portions: PORTIONS.find((p) => p.value === rest.portions)?.param as number,
    images: [...cleasingMainImage],
    details: [...cleansingDetailsImage],
  };
};
