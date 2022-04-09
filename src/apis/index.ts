import axios from 'axios'
import { MAPBOX_APIKEY } from 'react-native-dotenv';

export const apiGeocoding = axios.create({
  baseURL: `https://api.mapbox.com/geocoding/v5`,
  params: { 
    'access_token': MAPBOX_APIKEY
  }
})

export const apiDirections = axios.create({
  baseURL:  `https://api.mapbox.com/directions/v5/mapbox`,
  params: { 
    'access_token': MAPBOX_APIKEY
  }  
})

