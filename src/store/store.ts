import { format } from "date-fns";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthUser } from "../type";
import { Marker } from "../components/newMarker";

export interface UserInfo extends AuthUser {
  uid: string;
  nick: string;
  date_regis: number;
  profileImage?: string;
}

interface StoreState {
  userInfo: UserInfo | undefined;
  setUser: (user: UserInfo) => void;
  updateUser: (data: Partial<UserInfo>) => void;
  clearUser: () => void;

  marker: Marker | undefined;
  markerList: Marker[];
  setMarker: (marker: Marker) => void;
  putMarkerList: (marker: Marker) => void;
  updateMarkerList: (markerList: Marker[]) => void;
  removeMarkerList: (uid: string) => void;
  clearMarker: () => void;
  clearMarkerList: () => void;

  date: string;
  setDate: (date: string) => void;
}

const initialDate = format(new Date(), "yyyy-MM");

export const useStore = create<StoreState>()(
  devtools((set) => ({
    userInfo: undefined,
    setUser: (user) => set(() => ({ userInfo: user })),
    updateUser: (data) =>
      set((state) => ({
        userInfo: state.userInfo ? { ...state.userInfo, ...data } : undefined,
      })),
    clearUser: () => set({ userInfo: undefined }),

    marker: undefined,
    markerList: [],
    setMarker: (marker) => set(() => ({ marker })),
    putMarkerList: (marker) =>
      set((state) => ({ markerList: [...state.markerList, marker] })),
    updateMarkerList: (markerList) => set({ markerList: markerList }),
    removeMarkerList: (uid) =>
      set((state) => ({
        markerList: state.markerList.filter((marker) => marker?.uid !== uid),
      })),
    clearMarker: () => set({ marker: undefined }),
    clearMarkerList: () => set({ markerList: [] }),

    date: initialDate,
    setDate: (date) => set({ date }),
  }))
);
