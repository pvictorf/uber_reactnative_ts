import React from 'react';
import { TouchableOpacity, Text, ViewStyle, StyleProp } from 'react-native';
import tw from 'twrnc';

interface ChipProps {
  onPress: () => void,
  bgColor: string,
  textColor: string,
  text: string,
  style?: any,
  icon?: JSX.Element,
}

export const Chip = ({onPress, style, bgColor, textColor, text, icon}: ChipProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[tw`flex-row w-24 px-4 py-3 rounded-full items-center justify-around`, {...style, backgroundColor: bgColor}]}
    >
      {icon}
      <Text style={[tw`text-center`, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

