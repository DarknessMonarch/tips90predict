import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTermCardStore = create(
  persist(
    (set, get) => ({
      showCard: "Terms",
      setShowCard: (name) =>
        set({
          showCard: name,
        }),
    }),
    {
      name: "termcard-storage",
      getStorage: () => localStorage,
    }
  )
);
