import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker, MarkerProps } from 'react-native-maps'
import { Coordinates } from '../../models/Coordinates';

interface MapMarkerProps extends MarkerProps {
  location: Coordinates;
  format: 'circle' | 'square'
}

export const MapMarker = ({title, description, identifier, location, format, children}: MapMarkerProps) => {
  return (
    <Marker 
      coordinate={{
        latitude: location?.latitude,
        longitude: location?.longitude
      }}
      title={title}
      description={description}
      identifier={identifier}
    >
      {children}
      <View style={styles[format]} />
    </Marker>
  )
}

const styles = StyleSheet.create({
  circle: { 
    alignItems: 'center',
    justifyContent: 'center',
    width: 20, 
    height: 20, 
    borderRadius: 10,
    borderWidth: 8,
    borderColor: '#222',
    backgroundColor: '#fff',
  },

  square: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20, 
    height: 20, 
    borderRadius: 0,
    borderWidth: 8,
    borderColor: '#222',
    backgroundColor: '#fff',
  }
})
