import { Avatar, Button, Input, useDisclosure } from "@chakra-ui/react";
import { MapStyled } from "../style/componentStyle";
import { format, subYears } from "date-fns";
import MyphotoModal from "./modal/MyPhotoModal";
import { useUserStore } from "../store/useUserStore";
import { useDateStore } from "../store/useDateStore";
import { useEffect } from "react";

function BottomMenu({
  handleCurrentLocation,
  onSaveMode,
  saveMode,
  setSaveMode,
  setRender,
}) {
  const {
    isOpen: isMyPhotoOpen,
    onOpen: onOpenMyPhoto,
    onClose: onCloseMyPhoto,
  } = useDisclosure();
  const { userInfo } = useUserStore();
  const { date, setDate } = useDateStore();

  //과거 2년전까지 조회가능
  let minDate = format(subYears(new Date(), 2), "yyyy-MM");
  let maxDate = format(new Date(), "yyyy-MM");
  minDate = minDate.replace("%", "T");
  maxDate = maxDate.replace("%", "T");

  const onDateSet = (e) => {
    setDate(e.target.value);
    setRender((pre) => pre + 1);
  };

  useEffect(() => {
    setRender((pre) => pre + 1);
  }, [date]);

  return (
    <>
      <MapStyled>
        <div className="btn-container">
          <Avatar
            onClick={onOpenMyPhoto}
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            mr={2}
          />

          <Button boxShadow="lg" pr={0} pl={0} mr={2}>
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
            fontSize={14}
            onClick={onSaveMode}
          >
            {saveMode ? "위치탐색" : "위치저장"}
          </Button>
        </div>
      </MapStyled>

      <MyphotoModal
        userInfo={userInfo}
        isMyPhotoOpen={isMyPhotoOpen}
        onCloseMyPhoto={onCloseMyPhoto}
      />
    </>
  );
}

export default BottomMenu;
