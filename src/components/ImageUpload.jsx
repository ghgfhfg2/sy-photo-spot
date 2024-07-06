import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { Flex, Input, Text, useToast } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineUpload } from "react-icons/ai";
import imageCompression from "browser-image-compression";
import styled from "styled-components";
import { colors } from "../style/colors";

const UploadInputStyle = styled.div`
  .input-box {
    width: 100%;
    margin-left: 10px;
    #img_file {
      width: 0;
      height: 0;
      position: absolute;
      z-index: -1;
      overflow: hidden;
    }
    label {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 1rem;
      border-radius: 6px;
      border: 1px solid ${colors.MAIN};
      color: ${colors.MAIN};
      font-weight: 600;
      cursor: pointer;
    }
  }
  .preview-img-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
  }

  .file-txt {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    span {
      margin-top: 5px;
      margin-right: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      overflow: hidden;
      display: inline-block;
    }
    svg {
      margin-top: 4px;
    }
  }
`;

//base64 to file
export const dataURLtoFile = (dataurl, fileName) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};
const ImageUpload = ({ clipImg, setClipImg }) => {
  const toast = useToast();

  //이미지 리사이즈
  const imageResize = async (file, size) => {
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

  const clipboard = (e) => {
    if (clipImg?.length > 0) {
      toast({
        description: "이미 등록된 이미지가 있습니다.",
        status: "info",
        duration: 1000,
        isClosable: false,
      });
      return;
    } //하나만 허용할때

    const date = new Date().getTime();
    let fileObj = {};
    if (e.type === "paste" && !e.clipboardData.files[0]) {
      toast({
        description: "이미지가 아닙니다",
        status: "error",
        duration: 1000,
        isClosable: false,
      });
      return;
    }

    fileObj.file =
      e.type === "paste" ? e.clipboardData.files[0] : e.target.files[0];
    const fileType = fileObj.file.type;
    if (
      fileType !== "image/gif" &&
      fileType !== "image/png" &&
      fileType !== "image/jpeg"
    ) {
      toast({
        description: "지원하지않는 형식 입니다.",
        status: "error",
        duration: 1000,
        isClosable: false,
      });
      return;
    }
    fileObj.fileName =
      e.type === "paste"
        ? `${date}_copyImage.png`
        : `${date}_${fileObj.file.name}`;
    imageResize(fileObj.file, 400).then((res) => {
      fileObj = res;
      setClipImg([...clipImg, fileObj]);
    });
  };
  const removeClipImg = (idx) => {
    let arr = clipImg.concat();
    arr.splice(idx, 1);
    setClipImg(arr);
    document.querySelector("#img_file").value = "";
  };

  return (
    <UploadInputStyle>
      <Flex>
        <Input
          fontSize="sm"
          onPaste={clipboard}
          placeholder="복사한 이미지 붙여넣기"
        />
        <div className="input-box">
          <input type="file" id="img_file" onChange={clipboard} />
          <label htmlFor="img_file">
            <AiOutlineUpload />
            <Text fontSize="sm" ml={2}>
              직접 첨부하기
            </Text>
          </label>
        </div>
      </Flex>
      {clipImg &&
        clipImg.map((el, idx) => (
          <div className="preview-img-box" key={`${el}`}>
            <img src={el} />
            <div className="file-txt">
              <span>{el}</span>
              <button type="button" onClick={() => removeClipImg(idx)}>
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        ))}
    </UploadInputStyle>
  );
};

export default ImageUpload;
