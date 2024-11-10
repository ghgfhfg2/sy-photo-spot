import { firebaseConfig } from "../firebaseConfig";

export const extractFilePathFromUrl = (url) => {
  const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/`;
  const urlWithoutBase = url.replace(baseUrl, "");
  const pathEndIndex = urlWithoutBase.indexOf("?");
  const filePath = urlWithoutBase.substring(0, pathEndIndex);
  return decodeURIComponent(filePath);
};
