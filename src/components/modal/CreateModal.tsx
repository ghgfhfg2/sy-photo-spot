import React, { Dispatch, SetStateAction, useState } from "react";
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
import ImageUpload, { dataURLtoFile } from "../ImageUpload";
import { useForm, SubmitHandler } from "react-hook-form";
import { format, subYears } from "date-fns";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { api } from "../../api";
import { useMutation, useQueryClient } from "react-query";
import { useStore } from "../../store/store";
import { Marker } from "../newMarker";

// Define the types for the form data
interface FormValues {
  title: string;
  date: string;
  link?: string;
  a?: string;
  image_url?: string;
  user_uid?: string;
  user_nick?: string;
  lat?: number;
  lng?: number;
}

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  setNewMarker: Dispatch<SetStateAction<Marker | undefined>>; // 'undefined'를 처리할 수 있도록 수정
  newMarker: Marker | undefined; // 'undefined'를 처리할 수 있도록 수정
  setSaveMode: Dispatch<SetStateAction<boolean>>;
  setRender: Dispatch<SetStateAction<number>>;
}

function CreateModal({
  isOpen,
  onClose,
  setNewMarker,
  newMarker,
  setSaveMode,
  setRender,
}: CreateModalProps) {
  const userInfo = useStore((state) => state.userInfo);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>(); // Specify FormValues type

  const onCloseModal = () => {
    onClose();
    setNewMarker(undefined); // 초기화 시 'undefined'를 설정
    setSaveMode(false);
  };

  const [clipImg, setClipImg] = useState<string[]>([]); // Ensure string array type for image data

  // 과거 2년전까지 날짜 등록 가능
  let minDate = format(subYears(new Date(), 2), "yyyy-MM-dd'T'HH:mm");
  let maxDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  // 이미지 업로드
  const onUpdateImage = async (base64: string): Promise<string> => {
    if (!newMarker) throw new Error("새 마커가 설정되지 않았습니다.");
    const file = dataURLtoFile(base64, newMarker.id);
    const metadata = { contentType: file.type };
    const storageRef = sRef(storage, `images/${userInfo?.uid}/${newMarker.id}`);
    try {
      const snapshot = await uploadBytes(storageRef, file, metadata); // Pass metadata here
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다:", error);
      throw error; // Propagate error to caller
    }
  };

  const setImageLocation = async (location: FormValues) => {
    const { data } = await api.put(`/photo.php`, location);
    return data;
  };

  const queryClient = useQueryClient();
  const addLocaMutation = useMutation(setImageLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["location"]);
    },
  });

  // 신청
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
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
    if (!newMarker) {
      toast({
        description: "마커 정보가 없습니다.",
        status: "error",
        duration: 1000,
        isClosable: false,
      });
      return;
    }
    const imageUrl = await onUpdateImage(clipImg[0]);
    values.a = "setLocation";
    values.link = values.link || "";
    values.image_url = imageUrl;
    values.date = format(new Date(values.date), "yyyy-MM-dd HH:mm");
    values.user_uid = userInfo?.uid || ""; // Ensure UID is string
    values.user_nick = userInfo?.nick || ""; // Ensure nick is string
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
    setRender((pre) => pre + 1);
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
            <FormControl mt={4} isInvalid={!!errors.title}>
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
                {...register("date", { required: true })}
                placeholder="날짜"
                type="datetime-local"
                min={minDate}
                max={maxDate}
              />
            </FormControl>
            <FormControl mt={4} display="none">
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
