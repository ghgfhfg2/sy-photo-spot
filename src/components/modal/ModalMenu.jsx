import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { api } from "../../api";
import { extractFilePathFromUrl } from "../../utils/urlToPath";
import { deleteObject, ref as sRef } from "firebase/storage";
import { storage } from "../../firebase";
import { LuPencil } from "react-icons/lu";
import UpdateModal from "./UpdateModal";

export default function ModalMenu({ data, onCloseModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const deleteFileByUrl = async (url) => {
    const filePath = extractFilePathFromUrl(url); //url받아서 path로 변경
    const fileRef = sRef(storage, filePath);
    try {
      await deleteObject(fileRef);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }; //이미지 삭제

  const onRemove = (data) => {
    const agree = confirm("삭제하시겠습니까?");
    if (!agree) {
      return;
    }
    deleteFileByUrl(data.image_url);
    api
      .post(`photo.php`, {
        a: "removeLocation",
        uid: data.uid,
      })
      .then((res) => {
        onCloseModal();
        toast({
          description: "삭제 되었습니다.",
          status: "success",
          duration: 1000,
          isClosable: false,
        });
      });
  }; //마커 삭제

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<GoKebabHorizontal />}
          variant="none"
        />
        <MenuList fontSize={12}>
          <MenuItem
            onClick={() => {
              onOpen();
            }}
            icon={<LuPencil fontSize={14} />}
          >
            수정
          </MenuItem>
          <MenuItem
            onClick={() => {
              onRemove(data);
            }}
            icon={<MdOutlineDeleteOutline fontSize={14} />}
          >
            삭제
          </MenuItem>
        </MenuList>
      </Menu>
      <UpdateModal data={data} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
