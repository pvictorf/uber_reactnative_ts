import { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Separator } from '../components/Separator';
import IconIonic from '@expo/vector-icons/Ionicons'; 
import tw from 'twrnc';
import { useDirectionsStore } from '../stores/DirectionsStore';
import { TravelTime } from '../models/TravelTime';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';


const SURGE_CHARGE_RATE = 0.5;
const MIN_TRAVEL_PRICE = 4.50;
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
  const travelTime = useDirectionsStore(state => state.travelTimeInformation)

  function handleSelectRide(ride: any) {
    setSelectedRide(ride)
  }

  function displayTravelTime(travelTime: TravelTime): string {
    if(Number(travelTime?.hours) > 1) {
      return `${Number(travelTime?.hours)} hours ${Number(travelTime?.minutes)} minutes`;
    }
    return `${Number(travelTime?.minutes) || 2} minutes`;
  }

  function calcTravelTimePrice(totalMinutes: number, multiplier: number): string {
    if(totalMinutes <= 0) totalMinutes = MIN_TRAVEL_PRICE;

    const price = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format((totalMinutes * SURGE_CHARGE_RATE * multiplier));

    return price;
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
            {travelTime?.totalSeconds && (  
            <>
              <View style={tw`items-start flex-1 ml-4`}>
                <Text style={tw`text-lg font-semibold`}>{title}</Text>
                <Text style={tw`text-gray-400`}>{displayTravelTime(travelTime)}</Text>
              </View>
              <Text style={tw`text-lg`}>{calcTravelTimePrice(travelTime.totalMinutes, multiplier)}</Text>
            </>
            )}
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
