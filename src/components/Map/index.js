import { useState, useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useDirectionsStore } from '../../stores/DirectionsStore';
import tw from 'twrnc'

import { MapMarker } from '../MapMarker';
import { MapDirections } from '../MapDirections';
import { MatrixService } from '../../services/MatrixService';
import { LocationCard } from '../LocationCard';


export const Map = () => {
  const mapRef = useRef();
  const navigation = useNavigation()
  const origin = useDirectionsStore(state => state.origin);
  const destination = useDirectionsStore(state => state.destination);
  const setTravelTimeInformation = useDirectionsStore(state => state.setTravelTimeInformation);

  
  useEffect(() => {
    async function getTimeTravel() {
      if(!origin?.placeName || !destination?.placeName) return;

      const matrix = await MatrixService.findMatrixDuration(origin, destination);

      setTravelTimeInformation({
        ...matrix.travelTimeInformation
      });

      navigation.navigate('RideOptionsCardScreen');
    }
    getTimeTravel();
  }, [origin, destination]);



  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1 relative`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin?.location.latitude || 0,
        longitude: origin?.location.longitude || 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <MapDirections 
        mapRef={mapRef}
        origin={origin}
        destination={destination}
      /> 

      {origin?.placeName && (
        <MapMarker 
          title='Orign'
          identifier='origin'
          location={origin.location}
          description={origin.description}
          format='circle'
        >
        </MapMarker>
      )}

      {destination?.placeName && (
        <MapMarker 
          title='Destination'
          identifier='destination'
          location={destination.location}
          description={destination.description} 
          format='square'
        >
        </MapMarker>
      )}
      
    </MapView>  
  );
}

