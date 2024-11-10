import { useUserStore } from "./useUserStore";
import { useMarkerStore } from "./useMarkerStore";
import { useDateStore } from "./useDateStore";

export const useStore = () => {
  const userStore = useUserStore();
  const markerStore = useMarkerStore();
  const dateStore = useDateStore();

  return {
    ...userStore,
    ...markerStore,
    ...dateStore,
  };
};
