import { apiDirections } from "../apis"
import { Direction } from './../models/Direction';
import { Coordinates } from './../models/Coordinates';

export const DirectionsService = {
  
  async findDirections(origin: Direction, destination: Direction): Promise<Coordinates[]> {
    const startCoords = `${origin.location.longitude}, ${origin.location.latitude}`
    const endCoords = `${destination.location.longitude}, ${destination.location.latitude}`
    
    const { data } = await apiDirections.get(`/driving-traffic/${startCoords};${endCoords}?alternatives=false&geometries=geojson&steps=false&overview=full`)
    
    const routes = data?.routes[0]?.geometry || []

    if(!routes?.coordinates.length) return routes;

    return routes.coordinates.map((route: Array<number>) => this._mapper(route));
  },

  _mapper(route: Array<number>): Coordinates {
    return {
      latitude: route[1],
      longitude: route[0]
    }
  }

}