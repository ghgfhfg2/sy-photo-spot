import { Button, Input, useToast } from "@chakra-ui/react";
import React from "react";
import { MapStyled } from "../style/componentStyle";
import { api } from "../api";
import { format, subYears } from "date-fns";
import { useStore } from "../store/store";

function BottomMenu({
  handleCurrentLocation,
  onSaveMode,
  saveMode,
  setSaveMode,
}) {
  const setDate = useStore((state) => state.setDate);

  //과거 2년전까지 조회가능
  let minDate = format(subYears(new Date(), 2), "yyy-MM");
  let maxDate = format(new Date(), "yyy-MM");
  minDate = minDate.replace("%", "T");
  maxDate = maxDate.replace("%", "T");

  const onDateSet = (e) => {
    setDate(e.target.value);
  };

  return (
    <MapStyled>
      <div className="btn-container">
        <Button pr={0} pl={0} mr={2}>
          <Input
            fontSize="sm"
            border={0}
            type="month"
            min={minDate}
            max={maxDate}
            onClick={() => setSaveMode(false)}
            onChange={onDateSet}
            defaultValue={maxDate}
          />
        </Button>
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
