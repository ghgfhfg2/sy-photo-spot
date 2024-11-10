import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { getStorageImage } from "../utils/getStorageImage";

const useProfileImage = () => {
  const { userInfo } = useUserStore();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!userInfo) return;
    const getProfileImage = async () => {
      const profileImage = await getStorageImage(
        `images/${userInfo.uid}/profile`
      );
      setProfileImageUrl(profileImage);
    };
    getProfileImage();
  }, [userInfo]);
  return { profileImageUrl };
};

export default useProfileImage;
