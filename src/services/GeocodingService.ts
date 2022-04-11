import { geocodingApi } from "../apis"
import { Coordinates } from './../models/Coordinates';
import { Place } from './../models/Place';


export const GeocodingService = {

  async findPlaces(search: string, location: Coordinates): Promise<Place[]> {
    const userLocation = `${location.longitude},${location.latitude}`; //'-49.273182,-25.4354423'
    const { data } = await geocodingApi.get(`/mapbox.places/${search}.json?country=BR&limit=5&autocomplete=true&proximity=${userLocation}`)
    return data.features.map((data: any) => this._mapper(data))
  },

  _mapper(data: any): Place {
    return {
      id: data.id,
      text: data.text,
      placeName: data.place_name,
      geometry: data.geometry,
      location: {
        latitude: data.geometry.coordinates[1],
        longitude: data.geometry.coordinates[0],
      }
    }
  }
}