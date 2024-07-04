import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useStore } from "../../store/store";
import { RiUserLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdLink } from "react-icons/io";
import { colors } from "../../style/colors";

const PopupContainer = styled.div`
  width: 100%;
  .zoom {
    width: 400px;
  }
`;

const PopupImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`;

const InfoList = styled.div`
  padding: 10px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const InfoKey = styled.span`
  font-weight: bold;
`;

const InfoValue = styled.span`
  margin-left: 5px;
  font-weight: 600;
  &.link {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${colors.PURPLE_400};
  }
`;

function MarkerPopup({ isOpen, onClose, data }) {
  const { setMarker } = useStore();
  const onCloseModal = () => {
    setMarker({});
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사진 등록 요청하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <PopupContainer>
              <PopupImage src={data.image_url} alt="Image" />
              <InfoList>
                <InfoItem>
                  <InfoKey>
                    <RiUserLine />
                  </InfoKey>
                  <InfoValue>{data.user_nick}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoKey>
                    <MdOutlineDateRange />
                  </InfoKey>
                  <InfoValue>{data.date}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoKey>
                    <IoMdLink />
                  </InfoKey>
                  <InfoValue className="link">
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.link}
                    </a>
                  </InfoValue>
                </InfoItem>
              </InfoList>
            </PopupContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MarkerPopup;
