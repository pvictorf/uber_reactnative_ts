import {FlatList, View, Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconAntDesign from '@expo/vector-icons/AntDesign';
import tw from 'twrnc';
import { useDirectionsStore } from '../../stores/DirectionsStore';

// FIXME: CHANGE RESPONSABILITY CREATE TYPES
// https://stackoverflow.com/questions/68779417/navigation-navigatehome-showing-some-error-in-typescript
type Screens = 'MapScreen' | 'EatsScreen';

const data = [
  {
    id: "123",
    title: "Get a ride",
    screen: "MapScreen" as Screens,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "456",
    title: "Order a food",
    screen: "EatsScreen" as Screens,
    image: "https://links.papareact.com/28w"
  },
]


export const NavOptions = () => {
  const navigation = useNavigation()
  const origin = useDirectionsStore(state => state.origin);

  function hasOrigin(): boolean {
    return origin?.placeName ? true : false; 
  }

  return (
    <FlatList 
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity 
          onPress={() => navigation.navigate(item.screen) }
          style={tw`m-2 p-2 pl-6 pb-8 pt-4 bg-gray-200 w-40 rounded`}
          disabled={!hasOrigin()}
        >
          <View style={tw`${!hasOrigin() ? 'opacity-20' : 'opacity-100'}`}>
            <Image 
              source={{uri: item.image}}
              style={{width: 120, height: 120, resizeMode: 'contain'}}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <IconAntDesign 
              name='arrowright' color='white' size={20}
              style={tw`p-2 bg-black font-semibold rounded-full w-10 mt-4`}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}