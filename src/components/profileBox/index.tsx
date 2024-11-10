import { ProfileBoxStyle } from "./style";
import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useUserStore } from "../../store/useUserStore";
import ModifyProfileModal from "../modal/ModifyProfileModal";
import { IoSettingsOutline } from "react-icons/io5";

const ProfileBox = () => {
  const {
    isOpen: isProfileOpen,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const userInfo = useUserStore((state) => state.userInfo);
  if (!userInfo) return null;
  return (
    <>
      <ProfileBoxStyle>
        <Flex align="center" gap={3}>
          <Avatar className="profile-image" src={userInfo.profileImage || ""} />
          <span className="nick">{userInfo.nick}</span>
        </Flex>
        <Menu>
          <MenuButton
            as={IconButton}
            variant="outline"
            icon={<IoSettingsOutline />}
          ></MenuButton>
          <MenuList>
            <MenuItem onClick={onOpenProfile}>프로필 수정</MenuItem>
          </MenuList>
        </Menu>
      </ProfileBoxStyle>
      <ModifyProfileModal
        userInfo={userInfo}
        isProfileOpen={isProfileOpen}
        onCloseProfile={onCloseProfile}
      />
    </>
  );
};

export default ProfileBox;
