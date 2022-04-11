import { matrixApi } from "../apis"
import { calcSecondsToHours } from "../utils/timeCalculator";
import { Direction } from './../models/Direction';
import { MatrixDistance } from './../models/MatrixDistance';

export const MatrixService = {
  
  async findMatrixDuration(origin: Direction, destination: Direction): Promise<MatrixDistance> {
    const startCoords = `${origin.location.longitude},${origin.location.latitude}`
    const endCoords = `${destination.location.longitude},${destination.location.latitude}`
    
    const { data } = await matrixApi.get(`/mapbox/driving/${startCoords};${endCoords}`)

    return this._mapper(data)
  },

  _mapper(data: any): MatrixDistance {
    const sources = data?.sources.map((source: any) => ({
      ...source, 
      location: {
        latitude: source?.location[1], 
        longitude: source?.location[0],
      }
    })); 

    const destinations = data?.sources.map((destination: any) => ({
      ...destination, 
      location: {
        latitude: destination?.location[1], 
        longitude: destination?.location[0],
      }
    }))

    const travelTimeSeconds = data.durations.reduce((travel: number, times: Array<number>) => {
      const seconds = times.reduce((acc, seconds) => acc + seconds);
      return travel + seconds;
    }, 0);

    const travelTimeInformation = calcSecondsToHours(travelTimeSeconds)

    return {
      ...data,
      sources,
      travelTimeSeconds,
      travelTimeInformation,
      destinations,

    }
  }

}