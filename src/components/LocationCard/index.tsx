import { View, Text } from 'react-native';
import tw from 'twrnc';

export interface LocationCardProps {
  placeName: string,
  minutes: number,
}

export const LocationCard = ({placeName, minutes}: LocationCardProps) => {
  return (
    <View style={tw`flex-row`}>
      <View style={tw`bg-black`}>
        <Text style={tw`text-white`}>25 min.</Text>
      </View>
      <View style={tw`bg-black text-white flex-1`}>
        <Text style={tw`text-black`}>LocationCard</Text>
      </View>
    </View>
  )
}
