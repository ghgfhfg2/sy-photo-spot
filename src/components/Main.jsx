import { useEffect } from "react";
import { auth, db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import Map from "./Map";

function Main() {
  const navigate = useNavigate();
  const userInfo = useStore((state) => state.userInfo);
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
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

  return <Map userInfo={userInfo} />;
}

export default Main;
