import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const getStorageImage = async (imagePath: string) => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("이미지를 불러오는 중 오류가 발생했습니다:", error);
    return null;
  }
};
