import create from "zustand";
import { devtools } from "zustand/middleware";

export const useUserStore = create()(
  devtools(
    (set) => ({
      userInfo: {},
      setUser: (user) => set({ userInfo: user }),
      updateUser: (data) =>
        set((state) => ({ userInfo: { ...state.userInfo, ...data } })),
      clearUser: () => set({ userInfo: {} }),
    }),
    { name: "userStore" }
  )
);
