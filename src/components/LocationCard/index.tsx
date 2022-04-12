import { View, Text } from 'react-native';
import { ellipsisText } from '../../utils/ellipsisText';
import { TravelTime } from '../../models/TravelTime';
import tw from 'twrnc';
import IconIonic from '@expo/vector-icons/Ionicons'; 


export interface LocationCardProps {
  placeName: string,
  travel: TravelTime,
}

export const LocationCard = ({placeName, travel}: LocationCardProps) => {
  if(!travel.totalSeconds) return;

  return (
    <View style={tw`flex-row shadow-sm mt-7 z-10 `}>
      <View style={tw`bg-black px-2 py-1 items-center`}>
        <Text style={{color: '#fff', fontSize: 16}}>{Number(travel.hours) >= 1 ? `${travel.hours}` : `${travel.minutes}`}</Text>
        <Text style={{color: '#ddd', fontSize: 10}}>{Number(travel.hours) >= 1 ? 'HRS' : 'MIN'}</Text>
      </View>
      <View style={tw`flex-row bg-white p-1 items-center justify-center`}>
        <Text style={tw`text-black text-sm`}>
          {ellipsisText(placeName, 30)} 
        </Text>
        <IconIonic name='ios-chevron-forward' size={14} color="gray" />
      </View>
    </View>
  )
}
