import React, { useState, useEffect } from 'react';
import { LatLng, Polyline } from 'react-native-maps';
import { DirectionsService } from '../../services/DirectionsService';
import { getPixelSize } from '../../utils/pixelsSize';

interface MapDirectionsProps {
  origin: any,
  destination: any,
  mapRef: any,
}

export const MapDirections = ({ origin, destination, mapRef }: MapDirectionsProps) => {

  const [directions, setDirections] = useState<LatLng[]>([])

  useEffect(() => {
    if(!origin?.placeName || !destination?.placeName) {
      setDirections([]);
      mapRef.current.fitToSuppliedMarkers(['origin']) 
      return;
    }

    DirectionsService
      .findDirections(origin, destination)
      .then((routes) => {
        setDirections(routes as LatLng[])
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
          edgePadding: { 
            top: getPixelSize(80), 
            right: getPixelSize(80), 
            bottom: getPixelSize(80), 
            left: getPixelSize(80)
         }
        }) 
      })     
  }, [origin, destination]);

  if(!origin && !destination || !directions.length) {
    return null
  }

  return (

    <Polyline
      coordinates={directions}
      strokeColor="#222" 
      strokeWidth={4}
    />
  );
}
