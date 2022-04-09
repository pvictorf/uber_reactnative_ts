import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useDirectionsStore } from '../stores/DirectionsStore';
import { useUserStore } from '../stores/UserStore';
import tw from 'twrnc';

import { Place } from '../models/Place';
import { UberLogo } from '../components/UberLogo';
import { PlacesAutoComplete } from '../components/PlaceAutoComplete';
import { NavOptions } from '../components/NavOptions';



export const HomeScreen = () => {
  const user = useUserStore(state => state.user);
  const origin = useDirectionsStore(state => state.origin)
  const destination = useDirectionsStore(state => state.destination)
  const setOrigin = useDirectionsStore(state => state.setOrigin)
  const setDestination = useDirectionsStore(state => state.setDestination)


  useFocusEffect(() => {
    resetInitialState();
  }); 

  function resetInitialState() {
    if(destination?.placeName) {
      setDestination();
    }
  }

  function handlePressPlace(place: Place) {
    setOrigin({
      placeName: place.placeName,
      description: place.placeName,
      location: place.location,
    });
    resetInitialState();
  }

  return (
    <SafeAreaView style={[tw`bg-white h-full`]}> 
      <View style={tw`p-5`}>
        <UberLogo />
        <PlacesAutoComplete 
          placeholder='Where from?'
          onPress={(place) => handlePressPlace(place)}
          onSearchClear={() => setOrigin()}
          userLocation={user.location}
        />
        <NavOptions />
        {/* <NavFavourites /> */}
      </View>
    </SafeAreaView>
  )
}
