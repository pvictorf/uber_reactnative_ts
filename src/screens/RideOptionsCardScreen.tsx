import { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Separator } from '../components/Separator';
import IconIonic from '@expo/vector-icons/Ionicons'; 
import tw from 'twrnc';

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-X-456',
    title: 'Uber Comfort',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber Black',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  }

]

export const RideOptionsCardScreen = () => {
  const navigation = useNavigation();
  const [seletedRide, setSelectedRide] = useState<any>(null);

  function handleSelectRide(ride: any) {
    setSelectedRide(ride)
  }

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <Separator />
      <View>  
        <TouchableOpacity 
          style={tw`z-10 absolute top-3 left-5 p-3 rounded-full`}
          onPress={() => navigation.goBack()}
        >
          <IconIonic name="ios-chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`z-0 text-center py-5 text-xl`}>Select a Ride</Text> 
      </View>

      <FlatList 
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: {id, image, title, multiplier}, item }) => (
          <TouchableOpacity 
            style={tw`flex-row justify-between items-center px-8 ${id === seletedRide?.id ? 'bg-gray-200' : ''}`}
            onPress={() => handleSelectRide(item)}
          >
            <Image
              source={{uri: image}}
              style={{width: 90, height: 90, resizeMode: 'contain'}}
            />  
            <View style={tw`-ml-6`}>
              <Text style={tw`text-lg font-semibold`}>{title}</Text>
              <Text style={tw``}>Travel time...</Text>
            </View>
            <Text style={tw``}>R$ 36,99</Text>
          </TouchableOpacity> 
        )}
      />

      <View>
        <TouchableOpacity 
          style={tw`py-3 m-3 ${seletedRide?.id ? 'bg-black' : 'bg-gray-300'}`}
          disabled={!seletedRide?.id}
        >
          <Text style={tw`text-center text-white text-lg`}>
            Choose {seletedRide?.title}
          </Text>
        </TouchableOpacity>  
      </View> 

    </SafeAreaView>
  );
}
