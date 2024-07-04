import { Button } from "@chakra-ui/react";
import React from "react";
import { MapStyled } from "../style/componentStyle";

function BottomMenu({ handleCurrentLocation, onSaveMode, saveMode }) {
  return (
    <MapStyled>
      <div className="btn-container">
        <Button
          boxShadow="lg"
          className="btn-move-currnet"
          mr={2}
          fontSize={14}
          onClick={handleCurrentLocation}
        >
          현재위치
        </Button>
        <Button
          boxShadow="lg"
          colorScheme="purple"
          className="btn-move-currnet"
          fontSize={14}
          onClick={onSaveMode}
        >
          {saveMode ? "위치탐색" : "위치저장"}
        </Button>
      </div>
    </MapStyled>
  );
}

export default BottomMenu;
