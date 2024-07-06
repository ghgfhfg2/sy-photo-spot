import { divIcon } from "leaflet";
import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { IoMdLocate } from "react-icons/io";
import { Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { colors } from "../style/colors";
import CreateModal from "./modal/CreateModal";
import { useDisclosure } from "@chakra-ui/react";
import short from "short-uuid";
import { get, ref } from "firebase/database";
import { db } from "../firebase";

const NewMarker = ({ setSaveMode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); //위치저장 모달

  const iconMarkup = renderToStaticMarkup(
    <>
      <IoMdLocate
        style={{
          width: "30px",
          height: "30px",
          position: "absolute",
          zIndex: "2000",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          color: colors.PURPLE_600,
        }}
      />
    </>
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });

  const [newMarker, setNewMarker] = useState();
  useMapEvent("click", (e) => {
    const marker = {
      id: short.generate(),
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    };
    setNewMarker(marker);
    onOpen();
  });

  return (
    <>
      {newMarker && (
        <>
          <Marker
            key={newMarker.id}
            icon={customMarkerIcon}
            position={[newMarker.latitude, newMarker.longitude]}
          />
          <CreateModal
            setSaveMode={setSaveMode}
            isOpen={isOpen}
            data={newMarker}
            onClose={onClose}
            newMarker={newMarker}
            setNewMarker={setNewMarker}
          />
        </>
      )}
    </>
  );
};

export default NewMarker;
