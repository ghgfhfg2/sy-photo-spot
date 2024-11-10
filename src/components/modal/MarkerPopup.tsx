import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styled from "styled-components";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdLink } from "react-icons/io";
import { colors } from "../../style/colors";
import ModalMenu from "./ModalMenu";
import { useUserStore } from "../../store/useUserStore";
import { useMarkerStore } from "../../store/useMarkerStore";

const PopupContainer = styled.div`
  .zoom {
    width: 400px;
  }
`;

const PopupImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  max-height: calc(100vh - 20rem);
  object-fit: contain;
`;

const InfoList = styled.div`
  padding: 5px 0;
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

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  .user {
    font-size: 1rem;
    font-weight: 600;
  }
`;

function MarkerPopup({ isOpen, onClose, data, setRender }) {
  const userInfo = useUserStore((state) => state.userInfo);
  const setMarker = useMarkerStore((state) => state.setMarker);
  const onCloseModal = () => {
    setMarker({});
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <PopupContainer>
              <div className="img-box"></div>
              <PopupImage src={data.image_url} alt="Image" />
              <TopInfo>
                <div className="user">{data.user_nick}</div>
                {userInfo.uid === data.user_uid && (
                  <ModalMenu
                    setRender={setRender}
                    data={data}
                    onCloseModal={onCloseModal}
                  />
                )}
              </TopInfo>
              <InfoList>
                <InfoItem>
                  <InfoKey>
                    <MdOutlineDateRange />
                  </InfoKey>
                  <InfoValue>{data.date}</InfoValue>
                </InfoItem>
                {data.link && (
                  <InfoItem style={{ display: "none" }}>
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
                )}
              </InfoList>
            </PopupContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MarkerPopup;
