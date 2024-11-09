import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { equalCheck } from "../../utils/commonFunc";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { ref, update } from "firebase/database";
import ProfileImageUpload, {
  dataURLtoFile,
} from "../profileBox/ProfileImageUpload";

function ModifyProfileModal({ userInfo, isProfileOpen, onCloseProfile }) {
  const toast = useToast();

  const [clipImg, setClipImg] = useState([]); //이미지

  useEffect(() => {}, [userInfo]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  //이미지 업로드
  const onUpdateImage = async (base64) => {
    let file = dataURLtoFile(base64, newMarker.id);
    const metadata = { contentType: file.type };
    const storageRef = sRef(
      storage,
      `images/${userInfo.uid}/profile`,
      metadata
    );
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다:", error);
      throw error; // 오류를 호출자에게 전파합니다.
    }
  };

  const onSubmit = async (values) => {
    const check = equalCheck(values, userInfo); //변경사항 체크
    if (check) {
      onCloseProfile();
      return;
    } //변경없음
    const imageUrl = await onUpdateImage(clipImg[0]);
    update(ref(db, `users/${userInfo.uid}`), {
      nick: values.nick,
      profileImage: imageUrl,
    });

    toast({
      description: "수정되었습니다",
      status: "success",
      duration: 1000,
      isClosable: false,
    });
    onCloseProfile();
  };
  return (
    <Modal isOpen={isProfileOpen} onClose={onCloseProfile} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody py={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel fontSize="md" fontWeight={600}>
                프로필 이미지
              </FormLabel>
              <ProfileImageUpload clipImg={clipImg} setClipImg={setClipImg} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize="md" fontWeight={600}>
                닉네임
              </FormLabel>
              <Input
                fontSize="sm"
                {...register("nick", {
                  required: "닉네임은 필수항목 입니다.",
                })}
                defaultValue={userInfo.nick}
                placeholder="닉네임"
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <Flex mt={5}>
              <Button
                width="70%"
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isSubmitting}
              >
                수정하기
              </Button>
              <Button width="30%" onClick={onCloseProfile}>
                취소
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModifyProfileModal;
