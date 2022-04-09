import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDirectionsStore } from '../stores/DirectionsStore';
import tw from 'twrnc';

import { Chip } from '../components/Chip';
import { PlacesAutoComplete } from '../components/PlaceAutoComplete';
import { Place } from '../models/Place';

// import Separator from '../components/Separator';

export const NavigateCardScreen = () => {
  const navigation = useNavigation()
  const setDestination = useDirectionsStore(state => state.setDestination)

  function handlePressPlace(place: Place) {
    setDestination({
      placeName: place.placeName,
      description: place.placeName,
      location: place.location,
    })
  }

  function handleSearchClear() {
    setDestination();
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View>
        <Text style={tw`text-center text-xl py-5`}>Good Morning! {'Paulo Victor'}</Text> 
          <View style={tw`flex-shrink border-gray-200 border-t`}>
            <PlacesAutoComplete
              placeholder='Where to?'
              inputStyle={tw`flex-1 text-lg m-4 p-3 bg-gray-200`}
              placesStyle={tw`mx-2 mb-2`}
              onPress={(place) => handlePressPlace(place)}
              onSearchClear={() => handleSearchClear()}
              userLocation={{latitude: -22.8860887, longitude: -42.9876604}}
            />  
          </View>   
      </View> 
      {/*<NavFavourites />*/}  
      <View style={tw`flex-row bg-white justify-evenly py-4 mt-auto border-t border-gray-100`}>
        <Chip 
          onPress={() => navigation.navigate('RideOptionsCardScreen')}
          text='Rides' 
          bgColor='#222'
          textColor='#FFF'
        />
        <Chip 
          onPress={() => {}}
          text='Eats' 
          bgColor='#eee'
          textColor='#333'
        />
      </View>
    </SafeAreaView>
  );
}

