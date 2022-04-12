import React from 'react';
import { TouchableOpacity, Text, ViewStyle, StyleProp } from 'react-native';
import tw from 'twrnc';

interface ChipProps {
  onPress: () => void,
  bgColor: string,
  textColor: string,
  text: string,
  style?: any,
  disabled?: boolean,
  icon?: JSX.Element,
}

export const Chip = ({onPress, style, bgColor, textColor, text, icon, disabled}: ChipProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        tw`flex-row w-24 px-4 py-3 rounded-full items-center justify-around ${disabled ? 'opacity-80' : 'opacity-100'}`, 
        {...style, backgroundColor: bgColor}
      ]}
      disabled={disabled}

    >
      {icon}
      <Text style={[tw`text-center`, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

