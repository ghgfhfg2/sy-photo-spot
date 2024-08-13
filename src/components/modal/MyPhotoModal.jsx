import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { api } from "../../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useMap } from "react-leaflet";

const PhotoListStyle = styled.ul`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  li {
    cursor: pointer;
    position: relative;
    display: flex;
    img {
      object-fit: cover;
    }
  }
`;

function MyphotoModal({ userInfo, isMyPhotoOpen, onCloseMyPhoto }) {
  const map = useMap();
  const getPhotoList = async () => {
    const photos = await api
      .post("photo.php", {
        a: "getMyPhoto",
        uid: userInfo.uid,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        return { list: [] };
      });
    return photos;
  };
  const { data, error, isLoading } = useQuery(["photo"], getPhotoList, {
    enabled: !!userInfo?.uid,
  });
  const onCurrentPosition = (lat, lng) => {
    map.setView([lat, lng], 18);
  };

  return (
    <Modal isOpen={isMyPhotoOpen} onClose={onCloseMyPhoto} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={6}>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <PhotoListStyle>
              {data?.list?.map((el) => (
                <li
                  key={el.uid}
                  onClick={() => onCurrentPosition(el.lat, el.lng)}
                >
                  <img src={el.image_url} />
                </li>
              ))}
            </PhotoListStyle>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MyphotoModal;
