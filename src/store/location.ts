import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "@/constants";

export type locationType =
  | typeof locations.work
  | typeof locations.about
  | typeof locations.resume
  | typeof locations.trash;

const DEFAULT_LOCATION = locations.work;

interface BearState {
  activeLocations: Partial<locationType> | null;
  setActiveLocation: (location: Partial<locationType> | null) => void;
  resetActiveLocation: () => void;
}

const useLocationStore = create<BearState>()(
  immer((set) => ({
    activeLocations: DEFAULT_LOCATION,
    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined) return;
        state.activeLocations = location;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocations = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
