import { Coordinates } from './Coordinates';

export interface Place {
  id: number,
  text: string,
  placeName: string,
  geometry: object,
  location: Coordinates
}