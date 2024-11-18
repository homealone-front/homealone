import { uploadImage } from '@/utils/uploadImage';
import { RoomSchemaType } from './RoomWrite';
import { WriteRoomPostFetchParams } from '@/api/room/writeRoomPostFetch';
import { resizeAndConvertToWebp } from '@/utils/resizeAndConvertToWebp';

/**
 * 방자랑 등록 파라미터를 포맷팅한다.
 */
export const getRoomCleansingData = async (data: RoomSchemaType) => {
  const { thumbnailUrl, roomImages = [], ...rest } = data;

  /**
   * 대표 이미지를 업로드하고 params 형식에 맞춘다.
   */
  let cleansingMainImage;

  if (thumbnailUrl.image instanceof File) {
    if (!thumbnailUrl.image.name) {
      cleansingMainImage = thumbnailUrl.imageUrl;
    } else {
      const resizedImage = await resizeAndConvertToWebp(thumbnailUrl.image, { height: 480 });
      const uploadedImage = await uploadImage(resizedImage as File);
      cleansingMainImage = uploadedImage?.imageUrl;
    }
  }

  /**
   * 방자랑 이미지들을 업로드하고 params 형식에 맞춘다.
   */
  const cleansingRoomImage = (await Promise.all(
    roomImages
      .filter((item) => item.image instanceof File)
      .map(async (item) => {
        if (!item.image.name) {
          return item.imageUrl;
        } else {
          const resizedImage = await resizeAndConvertToWebp(item.image, { height: 480 });
          const uploadedImage = await uploadImage(resizedImage as File);
          return uploadedImage?.imageUrl;
        }
      }),
  )) as PropType<WriteRoomPostFetchParams, 'roomImages'>;

  return {
    ...rest,
    thumbnailUrl: cleansingMainImage,
    roomImages: cleansingRoomImage,
  } as WriteRoomPostFetchParams;
};
