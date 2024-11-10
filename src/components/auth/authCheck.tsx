import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useUserStore } from "../../store/useUserStore";

function AuthCheck() {
  const navigate = useNavigate();
  const { setUser, clearUser } = useUserStore();

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

  return <></>;
}

export default AuthCheck;
