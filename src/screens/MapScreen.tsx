import { SafeAreaView, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenOptions } from '../routes/options';
import tw from 'twrnc';

import { Map } from '../components/Map';
import { NavigateCardScreen } from './NavigateCardScreen';
import { RideOptionsCardScreen } from './RideOptionsCardScreen';


const Stack = createNativeStackNavigator()
  
export const MapScreen = () => {
  return (
    <SafeAreaView style={tw`relative`}>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        {/* Nested Stack Navigation */}
        <Stack.Navigator>
          <Stack.Screen 
            name='NavigateCardScreen'
            component={NavigateCardScreen}
            options={ScreenOptions}
          />
          <Stack.Screen 
            name='RideOptionsCardScreen'
            component={RideOptionsCardScreen}
            options={ScreenOptions}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
}
