import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { format, subYears } from "date-fns";
import { useForm } from "react-hook-form";
import { equalCheck } from "../../utils/commonFunc";
import { useState } from "react";
import { api } from "../../api";
import { useMarkerStore } from "../../store/useMarkerStore";

function UpdateModal({ data, isOpen, onClose }) {
  const { updateMarkerList, markerList, setMarker } = useMarkerStore();

  const toast = useToast();
  //과거 2년전까지 날짜 등록 가능
  let minDate = format(subYears(new Date(), 2), "yyy-MM-dd%HH:mm");
  let maxDate = format(new Date(), "yyy-MM-dd%HH:mm");
  minDate = minDate.replace("%", "T");
  maxDate = maxDate.replace("%", "T");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [prevData, setPrevData] = useState(data);

  const onSubmit = async (values) => {
    values.uid = data.uid;
    values.date = format(new Date(values.date), "yyyy-MM-dd HH:mm:ss");
    const check = equalCheck(values, prevData); //변경사항 체크
    if (check) {
      onClose();
      return;
    } //변경없음
    const newMarkerList = markerList.map((el) => {
      if (el.uid === values.uid) {
        el = { ...el, ...values };
        setMarker(el);
      }
      return el;
    }); //store 저장용 새 마커리스트
    updateMarkerList(newMarkerList);
    api.post(`photo.php`, {
      a: "updateLocation",
      ...values,
    });

    toast({
      description: "수정되었습니다",
      status: "success",
      duration: 1000,
      isClosable: false,
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={4}>
              <Input
                fontSize="sm"
                {...register("title", {
                  required: "제목은 필수항목 입니다.",
                })}
                defaultValue={data.title}
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
                defaultValue={data.date}
              />
            </FormControl>
            <FormControl mt={4} display="flex" justifyContent={"flex-end"}>
              <Checkbox
                defaultChecked={data.public ? true : false}
                {...register("public")}
              >
                모든 사람에게 공개
              </Checkbox>
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
              <Button width="30%" onClick={onClose}>
                취소
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateModal;
