import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from '../Divider';
import IconFeather from '@expo/vector-icons/Feather';
import tw from 'twrnc';
import { Coordinates } from '../../models/Coordinates';

interface NavFavouritesProps {
  onPress: (favourite: any) => void;
}

type icons = 'home' | 'briefcase';

const data = [
  {
    id: "123",
    icon: "home" as icons,
    placeName: "Home",
    description: "Alameda Doutor Muricy, Centro, Curitiba - Paraná",
    location: {
      latitude: -25.4324938,
      longitude: -49.2721489,
    } as Coordinates 
  },
  {
    id: "456",
    icon: "briefcase" as icons,
    placeName: "Work",
    description: "Niterói CCR Barcas, Centro - Rio de Janeiro",
    location: {
      latitude: -22.8940922,
      longitude: -43.1239278,
    } as Coordinates
  }
];

export const NavFavourites = ({onPress}: NavFavouritesProps) => {
  return (
    <View>
      <FlatList 
        keyExtractor={item => item.id.toString()}
        data={data}
        ItemSeparatorComponent={() => (
          <Divider bgColor='#eee' />
        )}
        renderItem={({item}) => (
          <TouchableOpacity 
            onPress={() => onPress({...item})}
            style={tw`flex-row items-center px-3 py-2`} 
          >
            <IconFeather 
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              name={item.icon}
              type='ionicon'
              color='white'
              size={18} 
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>{item.placeName}</Text>
              <Text style={tw`flex-wrap text-gray-500 max-w-xs`}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
