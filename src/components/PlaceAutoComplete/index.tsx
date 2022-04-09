import { useState, useCallback } from 'react';
import { TouchableOpacity, View, TextInput, Text, FlatList, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { debounce as debounceFn } from 'lodash'; 
import { GeocodingService } from '../../services/GeocodingService';
import { Coordinates } from '../../models/Coordinates';
import { Place } from '../../models/Place';
import IconFeather from '@expo/vector-icons/Feather';
import tw, { TailwindFn } from 'twrnc';


interface PlacesAutoCompleteProps {
  onPress: (item: Place) => void,
  onSearchClear: () => void,
  placeholder: string,
  debounce?: number,
  containerStyle?: any,
  inputStyle?: any,
  placesStyle?: any,
  userLocation?: Coordinates,
}

export const PlacesAutoComplete = ({ onPress, onSearchClear, placeholder, containerStyle, inputStyle, placesStyle, debounce = 700, userLocation }: PlacesAutoCompleteProps) => {
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
      <View style={containerStyle ? containerStyle : tw`flex-row items-center`}>
        <TextInput 
          value={search}
          style={inputStyle ? inputStyle : tw`text-lg m-2 flex-1`}
          placeholder={placeholder}
          onChangeText={onSearchChange}
        /> 
        <IconFeather 
          onPress={handleClearSearch}
          color={search ? '#ccc' : '#fff'} 
          name='x-circle' 
          type='feather' 
          size={24} 
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

