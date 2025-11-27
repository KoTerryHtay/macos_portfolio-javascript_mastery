import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "@/constants";
import type {
  AboutLocationInterface,
  ResumeLocationInterface,
  TrashLocationInterface,
  WorkLocationInterface,
} from "@/types";

export type LocationStore =
  | WorkLocationInterface["children"][number]
  | WorkLocationInterface
  | AboutLocationInterface
  | ResumeLocationInterface
  | TrashLocationInterface;

const DEFAULT_LOCATION: LocationStore = locations.work.children[0];

// Partial<locationType>
interface BearState {
  // Favorite :
  // My Projects : WindowDataInterface
  activeLocations: LocationStore;
  setActiveLocation: (location: LocationStore) => void;
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
