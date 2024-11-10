import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import { api } from "../../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useMap } from "react-leaflet";
import { useDateStore } from "../../store/useDateStore";
import { format } from "date-fns";
import ProfileBox from "../profileBox";

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

function MyphotoModal({ userInfo, isMyPhotoOpen, onCloseMyPhoto, onDateSet }) {
  const setDate = useDateStore((state) => state.setDate);
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
  const onCurrentPosition = (data) => {
    map.setView([data.lat, data.lng], 18);
    onDateSet(format(new Date(data.date), "yyyy-MM"));
    setDate(format(new Date(data.date), "yyyy-MM"));
    onCloseMyPhoto();
  };

  return (
    <Modal isOpen={isMyPhotoOpen} onClose={onCloseMyPhoto} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={6}>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <Box p={2} pt={5}>
              <ProfileBox />
              <PhotoListStyle>
                {data?.list?.map((el) => (
                  <li key={el.uid} onClick={() => onCurrentPosition(el)}>
                    <img src={el.image_url} />
                  </li>
                ))}
              </PhotoListStyle>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MyphotoModal;
