import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export const Separator = () => {
  return (
    <View style={tw`m-auto w-20 pt-2 pb-0`}>
      <View style={tw`rounded-xl h-1 bg-gray-200`} />
    </View>
  );
}

