import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "@/constants";

type locationType = typeof locations.work;

const DEFAULT_LOCATION = locations.work;

interface BearState {
  activeLocations: locationType | null;
  setActiveLocation: (location: locationType | null) => void;
  resetActiveLocation: () => void;
}

const useLocationStore = create<BearState>()(
  immer((set) => ({
    activeLocations: DEFAULT_LOCATION,
    setActiveLocation: (location = null) =>
      set((state) => {
        state.activeLocations = location;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocations = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
