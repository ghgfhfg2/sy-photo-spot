import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";

function CreateModal({ isOpen, onClose, setNewMarker, data }) {
  const initialRef = useRef();
  const finalRef = useRef();

  console.log(data);

  const onCloseModal = () => {
    onClose();
    setNewMarker("");
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <div>
              <Input ref={initialRef} placeholder="이미지 url" />
            </div>
          </FormControl>
          <FormControl mt={4}>
            <Input ref={initialRef} placeholder="First name" />
          </FormControl>
          <FormControl mt={4}>
            <Input placeholder="Last name" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onCloseModal}>다시선택</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateModal;
