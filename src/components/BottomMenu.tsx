import {
  Avatar,
  Button,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MapStyled } from "../style/componentStyle";
import { format, subYears } from "date-fns";
import { useStore } from "../store/store";
import ModifyProfileModal from "./modal/ModifyProfileModal";
import React from "react";

interface BottomMenuProps {
  handleCurrentLocation: () => void; // 현재 위치를 처리하는 함수
  onSaveMode: () => void; // 저장 모드를 전환하는 함수
  saveMode: boolean; // 저장 모드 상태
  setSaveMode: React.Dispatch<React.SetStateAction<boolean>>; // 저장 모드 상태를 변경하는 함수
  setRender: React.Dispatch<React.SetStateAction<number>>; // 렌더링 상태를 변경하는 함수
}

const BottomMenu: React.FC<BottomMenuProps> = ({
  handleCurrentLocation,
  onSaveMode,
  saveMode,
  setSaveMode,
  setRender,
}) => {
  const {
    isOpen: isProfileOpen,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const setDate = useStore((state) => state.setDate);
  const userInfo = useStore((state) => state.userInfo);

  //과거 2년전까지 조회가능
  let minDate = format(subYears(new Date(), 2), "yyy-MM");
  let maxDate = format(new Date(), "yyy-MM");
  minDate = minDate.replace("%", "T");
  maxDate = maxDate.replace("%", "T");

  const onDateSet = (e: any) => {
    setDate(e.target.value);
    setRender((pre) => pre + 1);
  };

  return (
    <>
      <MapStyled>
        <div className="btn-container">
          <Menu>
            <MenuButton
              as={Avatar}
              boxShadow="lg"
              mr={2}
              src={
                userInfo && userInfo.profileImage ? userInfo.profileImage : ""
              }
              bg="purple.500"
            ></MenuButton>
            <MenuList>
              <MenuItem onClick={onOpenProfile}>프로필 수정</MenuItem>
            </MenuList>
          </Menu>
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
      <ModifyProfileModal
        isProfileOpen={isProfileOpen}
        onCloseProfile={onCloseProfile}
      />
    </>
  );
};

export default BottomMenu;
