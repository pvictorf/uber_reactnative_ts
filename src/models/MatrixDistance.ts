import { Coordinates } from './Coordinates';

export interface MatrixDistance {
  code: string,
  travelTimeSeconds: number,
  travelTimeInformation: {
    hours: string,
    minutes: string,
    time: number,
  },
  durations: Array<Array<number>>,
  sources: MatrixLocality[],
  destinations: MatrixLocality[],
}

export interface MatrixLocality {
  name: string,
  location: Coordinates,
  distance: number,
}