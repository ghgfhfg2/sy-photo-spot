import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create()(
  devtools((set) => ({
    userInfo: {},
    setUser: (user) => set((state) => ({ ...state, userInfo: user })),
    updateUser: (data) =>
      set((state) => ({ ...state, userInfo: { ...state.userInfo, ...data } })),
    clearUser: () => set((state) => ({ ...state, userInfo: {} })),

    marker: {},
    markerList: [],
    setMarker: (marker) => set((state) => ({ ...state, marker })),
    putMarkerList: (marker) =>
      set((state) => ({ ...state, markerList: [...state.markerList, marker] })),
    clearMarker: () => set((state) => ({ ...state, marker: {} })),
    clearMarkerList: () => set((state) => ({ ...state, markerList: [] })),
  }))
);
