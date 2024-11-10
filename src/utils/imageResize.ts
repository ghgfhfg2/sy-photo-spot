import imageCompression from "browser-image-compression";
//이미지 리사이즈
export const imageResize = async (file, size) => {
  if (file.type === "image/svg+xml") {
    return file;
  }
  const options = {
    maxWidthOrHeight: size,
    fileType: file.type,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    const promise = imageCompression.getDataUrlFromFile(compressedFile);
    return promise;
  } catch (error) {
    console.log(error);
  }
};

//base64 이미지 리사이즈
export const resizeBase64Image = (
  base64: string,
  maxWidth: number = 300
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 비율 계산
      const ratio = maxWidth / img.width;
      const width = maxWidth;
      const height = img.height * ratio;

      // 캔버스 크기 설정
      canvas.width = width;
      canvas.height = height;

      // 이미지 그리기
      ctx?.drawImage(img, 0, 0, width, height);

      try {
        // 압축된 이미지를 base64로 변환 (품질 0.8)
        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        resolve(resizedBase64);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};
