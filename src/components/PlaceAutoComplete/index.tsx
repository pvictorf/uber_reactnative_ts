import { useState, useCallback } from 'react';
import { TouchableOpacity, View, TextInput, Text, FlatList, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { debounce as debounceFn } from 'lodash'; 
import { GeocodingService } from '../../services/GeocodingService';
import { Coordinates } from '../../models/Coordinates';
import { Place } from '../../models/Place';
import IconFeather from '@expo/vector-icons/Feather';
import tw from 'twrnc';


interface PlacesAutoCompleteProps {
  onPress: (item: Place) => void,
  onSearchClear: () => void,
  placeholder: string,
  debounce?: number,
  containerStyle?: any,
  iconStyle?: any,
  inputStyle?: any,
  placesStyle?: any,
  userLocation?: Coordinates,
}

export const PlacesAutoComplete = ({ onPress, onSearchClear, placeholder, containerStyle, inputStyle, iconStyle, placesStyle, debounce = 700, userLocation }: PlacesAutoCompleteProps) => {
  const [places, setPlaces] = useState<Place[]>([])
  const [search, setSearch] = useState('')
  const debounceFindPlaces = useCallback(debounceFn(findPlaces, debounce), []);

  function findPlaces(text: string) {
    if(!text.trim()) {
      handleClearSearch()
      return;
    }
    GeocodingService
      .findPlaces(text, userLocation ?? {latitude: 0, longitude: 0})
      .then(places => setPlaces(places))
  }

  function handleClearSearch() {
    setSearch('')
    setPlaces([])
    onSearchClear();
  }

  function onPlacePress(item: Place) {
    setSearch(item.placeName)
    setPlaces([])
    onPress(item)
  }

  function onSearchChange(text: string) {
    setSearch(text)
    debounceFindPlaces(text)
  }


  return (
    <View>
      <View style={[tw`flex-row items-center relative`, containerStyle]}>
        <TextInput 
          value={search}
          style={[tw`flex-1 text-lg p-3 pr-10`, inputStyle, {minHeight: 55}]}
          placeholder={placeholder}
          onChangeText={onSearchChange}
        /> 
        <IconFeather 
          onPress={handleClearSearch}
          style={[tw`text-lg text-gray-300 absolute right-3 ${search ? 'opacity-100' : 'opacity-0'}`, iconStyle]}
          name='x-circle' 
          type='feather' 
          size={23} 
        /> 
      </View>

      {places.length > 0 && (
        <FlatList
          data={places}
          style={placesStyle}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={tw`flex-row py-3 border-b border-gray-100`}
              onPress={() => onPlacePress(item)}
            >
              <View>
                <Text style={tw`text-black ml-2`}>
                  {item.placeName}
                </Text>
              </View>
            </TouchableOpacity>
          )}  
        />
      )}

    </View>
  );
}

