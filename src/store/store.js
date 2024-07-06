import { format } from "date-fns";
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
    updateMarkerList: (markerList) =>
      set((state) => ({ ...state, markerList: markerList })),
    removeMarkerList: (uid) =>
      set((state) => ({
        ...state,
        markerList: state.markerList.filter((marker) => marker.uid !== uid),
      })),
    clearMarker: () => set((state) => ({ ...state, marker: {} })),
    clearMarkerList: () => set((state) => ({ ...state, markerList: [] })),

    date: format(new Date(), "yyy-MM"),
    setDate: (date) => set((state) => ({ ...state, date })),
  }))
);
