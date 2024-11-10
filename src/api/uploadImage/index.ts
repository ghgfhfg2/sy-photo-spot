import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { dataURLtoFile } from "../../components/ImageUpload";
import { resizeBase64Image } from "../../utils/imageResize";

//썸네일 업로드
export const onUpdateThumbnail = async (
  base64: string,
  markerId: string,
  userUid: string
) => {
  // 이미지 리사이징

  const resizedFile = await resizeBase64Image(base64, 50);
  let file = dataURLtoFile(resizedFile, `thumb_${markerId}`);
  const storageRef = ref(storage, `thumbnails/${userUid}/${markerId}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("썸네일 업로드 중 오류가 발생했습니다:", error);
    throw error;
  }
};
