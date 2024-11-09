import create from "zustand";
import { devtools } from "zustand/middleware";

export const useMarkerStore = create()(
  devtools(
    (set) => ({
      marker: {},
      markerList: [],
      setMarker: (marker) => set({ marker }),
      putMarkerList: (marker) =>
        set((state) => ({ markerList: [...state.markerList, marker] })),
      updateMarkerList: (markerList) => set({ markerList }),
      removeMarkerList: (uid) =>
        set((state) => ({
          markerList: state.markerList.filter((marker) => marker.uid !== uid),
        })),
      clearMarker: () => set({ marker: {} }),
      clearMarkerList: () => set({ markerList: [] }),
    }),
    { name: "markerStore" }
  )
);
