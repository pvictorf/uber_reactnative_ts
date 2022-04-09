import React, { useState, useEffect } from 'react';
import { LatLng, Polyline } from 'react-native-maps';
import { DirectionsService } from '../../services/DirectionsService';
import { Coordinates } from '../../models/Coordinates';

interface MapDirectionsProps {
  origin: any,
  destination: any,
  mapRef: any,
}

export const MapDirections = ({ origin, destination, mapRef }: MapDirectionsProps) => {

  const [directions, setDirections] = useState<LatLng[]>([])

  useEffect(() => {
    if(!origin?.placeName || !destination?.placeName) return;

    DirectionsService
      .findDirections(origin, destination)
      .then((routes) => {
        setDirections(routes as LatLng[])
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }
        }) 
      })     
  }, [origin, destination]);

  if(!origin && !destination && !directions) {
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
