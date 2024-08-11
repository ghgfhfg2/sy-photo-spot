import React, { useEffect } from "react";
import { auth, db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import Map from "./map";
import { AuthUser } from "../type";

function Main() {
  const navigate = useNavigate();
  const userInfo = useStore((state) => state.userInfo);
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);
  useEffect(() => {
    auth.onAuthStateChanged((user: AuthUser | null) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (data) => {
          if (data.val()) {
            let userData = {
              ...user,
              ...data.val(),
            };
            setUser(userData);
          }
        });
      } else {
        clearUser();
        navigate("/login");
      }
    });
  }, []);

  return userInfo && <Map />;
}

export default Main;
