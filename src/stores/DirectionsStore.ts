import { TravelTime } from './../models/TravelTime';
import create from "zustand";

import { Direction } from '../models/Direction';

interface State {
  origin?: Direction | null,
  destination?: Direction | null,
  travelTimeInformation?: TravelTime,

  setOrigin: (origin?: Direction) => void,
  setDestination: (destination?: Direction) => void,
  setTravelTimeInformation: (travelTimeInformation?: TravelTime) => void,
}


export const useDirectionsStore = create<State>((set) => ({
  origin: {} as Direction,
  destination: {} as Direction,
  travelTimeInformation: {} as TravelTime,
  
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setTravelTimeInformation: (travelTimeInformation) => set({ travelTimeInformation }),
}));