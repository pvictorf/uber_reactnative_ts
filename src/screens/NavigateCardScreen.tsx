import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../stores/UserStore';
import { useDirectionsStore } from '../stores/DirectionsStore';
import IconIonic from '@expo/vector-icons/Ionicons'; 
import tw from 'twrnc';

import { Chip } from '../components/Chip';
import { Separator } from '../components/Separator';
import { PlacesAutoComplete } from '../components/PlaceAutoComplete';
import { Place } from '../models/Place';
import { NavFavourites } from '../components/NavFavourites';


export const NavigateCardScreen = () => {
  const navigation = useNavigation()
  const user = useUserStore(state => state.user)
  const setDestination = useDirectionsStore(state => state.setDestination)

  function handlePressPlace(place: Place) {
    setDestination({
      placeName: place.placeName,
      description: place.placeName,
      location: place.location,
    })
  }

  function handlePressFavourite(favourite: any) {
    setDestination({
      placeName: favourite.placeName,
      description: favourite.placeName,
      location: favourite.location,
    })
  }

  function handleSearchClear() {
    setDestination();
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View>
        <Separator />
        <Text style={tw`text-center text-xl py-5`}>Good Morning! {user.name}</Text> 
          <View style={tw`flex-shrink border-gray-200 border-t pt-4`}>
            <PlacesAutoComplete
              placeholder='Where to?'
              inputStyle={tw`mx-4 bg-gray-200`}
              iconStyle={tw`text-lg text-gray-500 absolute right-8`}
              placesStyle={tw`mx-2 mb-2`}
              onPress={(place) => handlePressPlace(place)}
              onSearchClear={() => handleSearchClear()}
              userLocation={user.location}
            />  
          </View>   
      </View> 
      <NavFavourites onPress={handlePressFavourite} />
      <View style={tw`flex-row bg-white justify-evenly py-4 mt-auto border-t border-gray-100`}>
        <Chip 
          onPress={() => navigation.navigate('RideOptionsCardScreen')}
          text='Rides' 
          bgColor='#222'
          textColor='#FFF'
          icon={<IconIonic name='car' size={22} color='#fff' />}
        />
        <Chip 
          onPress={() => {}}
          text='Eats' 
          bgColor='#eee'
          textColor='#333'
          icon={<IconIonic name='fast-food-outline' size={22} color='black'/>}
        />
      </View>
    </SafeAreaView>
  );
}

