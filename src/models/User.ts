import { Coordinates } from "./Coordinates";

export interface User {
  name: string,
  phone?: string,
  email?: string,
  location: Coordinates
}