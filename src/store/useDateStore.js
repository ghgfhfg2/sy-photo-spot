import create from "zustand";
import { devtools } from "zustand/middleware";
import { format } from "date-fns";

export const useDateStore = create()(
  devtools(
    (set) => ({
      date: format(new Date(), "yyyy-MM"),
      setDate: (date) => set({ date }),
    }),
    { name: "dateStore" }
  )
);
