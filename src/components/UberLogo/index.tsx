import React from 'react';
import {View, Image} from 'react-native';

export const UberLogo = () => {
  return (
    <Image 
      style={{ width: 100, height: 100, resizeMode: 'contain' }}
      source={{ uri: 'https://links.papareact.com/gzs' }} 
    />
  );
}

