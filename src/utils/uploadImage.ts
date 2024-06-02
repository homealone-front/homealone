import { firebaseStorage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

/**
 * 파이어베이스 storage에 이미지를 올린다.
 */
export const uploadImage = async (file: File) => {
  if (!(file instanceof File)) {
    return;
  }

  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const uniqueFileName = `${currentDate}_${uuidv4()}.${file.name.split('.').pop()}`;
    const storageRef = ref(firebaseStorage, `images/${uniqueFileName}`);

    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    return { fileName: uniqueFileName, imageUrl: downloadURL };
  } catch (error) {
    console.error(error);
  }
};
