import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import ImageUpload, { dataURLtoFile } from "../ImageUpload";
import { useForm } from "react-hook-form";
import { format, subYears } from "date-fns";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { api } from "../../api";
import { useMutation, useQueryClient } from "react-query";
import { useStore } from "../../store/store";

function CreateModal({
  isOpen,
  onClose,
  setNewMarker,
  newMarker,
  setSaveMode,
}) {
  const userInfo = useStore((state) => state.userInfo);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onCloseModal = () => {
    onClose();
    setNewMarker("");
    console.log(11);
    console.log("setSaveMode", setSaveMode);

    setSaveMode(false);
  };

  const [clipImg, setClipImg] = useState([]); //이미지

  //과거 2년전까지 날짜 등록 가능
  let minDate = format(subYears(new Date(), 2), "yyy-MM-dd%HH:mm");
  let maxDate = format(new Date(), "yyy-MM-dd%HH:mm");
  minDate = minDate.replace("%", "T");
  maxDate = maxDate.replace("%", "T");

  //이미지 업로드
  const onUpdateImage = async (base64) => {
    let file = dataURLtoFile(base64, newMarker.id);
    const metadata = { contentType: file.type };
    const storageRef = sRef(
      storage,
      `images/${userInfo.uid}/${newMarker.id}`,
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

  const setImageLocation = (location) => {
    const { data } = api.put(`/photo.php`, location);
    return data;
  };

  const queryClient = useQueryClient();
  const addLocaMutation = useMutation(setImageLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["location"]);
    },
  });

  //신청
  const onSubmit = async (values) => {
    if (!clipImg[0]) {
      toast({
        description: "이미지를 첨부해 주세요",
        status: "info",
        duration: 1000,
        isClosable: false,
      });
      return;
    }
    if (!values.title) {
      toast({
        description: "제목을 입력해 주세요",
        status: "error",
        duration: 1000,
        isClosable: false,
      });
      return;
    }
    const imageUrl = await onUpdateImage(clipImg[0]);
    values.a = "setLocation";
    values.image_url = imageUrl;
    values.date = format(new Date(values.date), "yyyy-MM-dd HH:mm");
    values.user_uid = userInfo.uid;
    values.user_nick = userInfo.nick;
    values.lat = newMarker.latitude;
    values.lng = newMarker.longitude;
    addLocaMutation.mutate(values);
    onCloseModal();
    toast({
      description: "등록 신청이 완료되었습니다.",
      status: "success",
      duration: 1000,
      isClosable: false,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>사진 등록 요청하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <ImageUpload clipImg={clipImg} setClipImg={setClipImg} />
            </FormControl>
            <FormControl mt={4}>
              <Input
                fontSize="sm"
                {...register("title", {
                  required: "제목은 필수항목 입니다.",
                })}
                placeholder="제목"
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
              <Input
                fontSize="sm"
                {...register("date")}
                placeholder="Last name"
                type="datetime-local"
                min={minDate}
                max={maxDate}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                fontSize="sm"
                {...register("link")}
                placeholder="링크주소 (선택사항)"
              />
            </FormControl>
            <Flex mt={5}>
              <Button
                width="70%"
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isSubmitting}
              >
                신청
              </Button>
              <Button width="30%" onClick={onCloseModal}>
                취소
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateModal;
