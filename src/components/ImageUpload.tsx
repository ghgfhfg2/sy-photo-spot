import React from "react";
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

// TypeScript type for converting a data URL to a File
type DataURLToFileFunction = (dataurl: string, fileName: string) => File;

// Converts base64 data URL to a File object
export const dataURLtoFile: DataURLToFileFunction = (dataurl, fileName) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)?.[1] || "",
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

// Props for ImageUpload component
interface ImageUploadTypeProps {
  clipImg: string[];
  setClipImg: (images: string[]) => void;
}

// ImageUpload component
const ImageUpload: React.FC<ImageUploadTypeProps> = ({
  clipImg,
  setClipImg,
}) => {
  const toast = useToast();

  // TypeScript type for image resizing return value
  type ImageResizeReturn = Promise<string>;

  // Function to resize images
  const imageResize = async (file: File, size: number): ImageResizeReturn => {
    if (file.type === "image/svg+xml") {
      return Promise.resolve(URL.createObjectURL(file));
    }
    const options = {
      maxWidthOrHeight: size,
      fileType: file.type,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const dataUrl = await imageCompression.getDataUrlFromFile(compressedFile);
      return dataUrl;
    } catch (error) {
      console.log(error);
      toast({
        description: "이미지 압축에 실패했습니다.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      throw error;
    }
  };

  // Clipboard or file input change handler
  const clipboard = async (
    e:
      | React.ClipboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (clipImg.length > 0) {
      toast({
        description: "이미 등록된 이미지가 있습니다.",
        status: "info",
        duration: 1000,
        isClosable: false,
      });
      return;
    }

    const date = new Date().getTime();
    let file: File | null = null;

    if (e.type === "paste") {
      const clipboardEvent = e as React.ClipboardEvent<HTMLInputElement>;
      if (
        !clipboardEvent.clipboardData ||
        !clipboardEvent.clipboardData.files[0]
      ) {
        toast({
          description: "이미지가 아닙니다",
          status: "error",
          duration: 1000,
          isClosable: false,
        });
        return;
      }
      file = clipboardEvent.clipboardData.files[0];
    } else if (e.type === "change") {
      const changeEvent = e as React.ChangeEvent<HTMLInputElement>;
      if (!changeEvent.target.files || !changeEvent.target.files[0]) {
        return;
      }
      file = changeEvent.target.files[0];
    }

    if (!file) {
      return;
    }

    const fileType = file.type;
    if (
      fileType !== "image/gif" &&
      fileType !== "image/png" &&
      fileType !== "image/jpeg"
    ) {
      toast({
        description: "지원하지 않는 형식입니다.",
        status: "error",
        duration: 1000,
        isClosable: false,
      });
      return;
    }

    const fileName =
      e.type === "paste" ? `${date}_copyImage.png` : `${date}_${file.name}`;
    try {
      const resizedImageUrl = await imageResize(file, 400);
      setClipImg([...clipImg, resizedImageUrl]);
    } catch (error) {
      console.log("Image resize error:", error);
    }
  };

  // Function to remove image from the list
  const removeClipImg = (idx: number) => {
    const arr = clipImg.slice();
    arr.splice(idx, 1);
    setClipImg(arr);
    const inputElement = document.querySelector<HTMLInputElement>("#img_file");
    if (inputElement) {
      inputElement.value = "";
    }
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
          <div className="preview-img-box" key={el}>
            <img src={el} alt={`uploaded-${idx}`} />
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
