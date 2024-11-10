import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청 인터셉터
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      // 기존 토큰은 헤더로 유지
      const token = await user.getIdToken();
      config.headers["Authorization"] = `Bearer ${token}`;

      // GET 요청의 경우 params에 추가
      if (config.method?.toLowerCase() === "get") {
        config.params = {
          ...config.params, // 기존 파라미터 유지
          userUid: user.uid,
          userEmail: user.email,
        };
      }

      // POST, PUT, PATCH 등의 요청의 경우 data에 추가
      if (
        ["post", "put", "patch"].includes(config.method?.toLowerCase() || "")
      ) {
        config.data = {
          ...config.data, // 기존 데이터 유지
          userUid: user.uid,
          userEmail: user.email,
        };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
