import { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDirectionsStore } from '../../stores/DirectionsStore';
import tw from 'twrnc'

import { MapDirections } from '../MapDirections'; 
import { MatrixService } from '../../services/MatrixService';
import { LocationCard } from '../LocationCard';
import markerImage from '../../../assets/images/marker.png';
import markerCircleImage from '../../../assets/images/markercircle.png';
import { useNavigation } from '@react-navigation/native';

export const Map = () => {
  const mapRef = useRef();
  const navigation = useNavigation()
  const origin = useDirectionsStore(state => state.origin);
  const destination = useDirectionsStore(state => state.destination);
  const setTravelTimeInformation = useDirectionsStore(state => state.setTravelTimeInformation);
  const travelTimeInformation = useDirectionsStore(state => state.travelTimeInformation);

  
  useEffect(() => {
    async function getTimeTravel() {
      if(!origin?.placeName || !destination?.placeName) return;

      const matrix = await MatrixService.findMatrixDuration(origin, destination);
      
      setTravelTimeInformation({
        ...matrix.travelTimeInformation
      });

      if(travelTimeInformation.totalSeconds > 0) {
        navigation.navigate('RideOptionsCardScreen');
      }
    }
    getTimeTravel();
  }, [origin, destination]);


  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1 relative`}
      mapType='mutedStandard'
      showsUserLocation={true}
      userInterfaceStyle={'dark'}
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
        <Marker 
          title='Origin'
          identifier='origin'
          description={origin.description} 
          coordinate={{...origin.location}}
          image={markerCircleImage}
          anchor={{ x: 0, y: 0 }}
        >
        </Marker>
      )}

      {destination?.placeName && travelTimeInformation && (
        <Marker 
          title='Destination'
          identifier='destination'
          description={destination.description} 
          coordinate={{...destination.location}}
          image={markerImage}
          anchor={{ x: 0, y: 0 }}
        >
          <LocationCard placeName={destination.placeName} travel={travelTimeInformation} />
        </Marker>
      )}
      
    </MapView>  
  );
}

