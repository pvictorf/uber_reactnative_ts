import { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDirectionsStore } from '../../stores/DirectionsStore';
import tw from 'twrnc'

import { MapMarker } from '../MapMarker';
import { MapDirections } from '../MapDirections';

export const Map = () => {
  const mapRef = useRef()
  const origin = useDirectionsStore(state => state.origin);
  const destination = useDirectionsStore(state => state.destination);

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
        />
      )}

      {destination?.placeName && (
        <MapMarker 
          title='Destination'
          identifier='destination'
          location={destination.location}
          description={destination.description} 
          format='square'
        />
      )}
      
    </MapView>  
  );
}

