import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { equalCheck } from "../../utils/commonFunc";

function ModifyProfileModal({ userInfo, isProfileOpen, onCloseProfile }) {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const check = equalCheck(values, userInfo); //변경사항 체크
    if (check) {
      onCloseProfile();
      return;
    } //변경없음

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
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
