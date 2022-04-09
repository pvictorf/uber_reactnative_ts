import create from "zustand";

import { Direction } from '../models/Direction';

interface State {
  origin?: Direction | null,
  destination?: Direction | null,
  travelTimeInformation?: object,

  setOrigin: (origin?: Direction) => void,
  setDestination: (destination?: Direction) => void,
  setTravelTimeInformation: (travelTimeInformation?: any) => void,
}


export const useDirectionsStore = create<State>((set) => ({
  origin: {} as Direction,
  destination: {} as Direction,
  travelTimeInformation: {},
  
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setTravelTimeInformation: (travelTimeInformation) => set({ travelTimeInformation }),
}));