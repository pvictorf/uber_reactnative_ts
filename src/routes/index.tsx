import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ScreenOptions } from './options';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../screens/MapScreen';
import { EatsScreen } from '../screens/EatsScreen';
import { useUserStore } from '../stores/UserStore';


export type RootStackParamList  = {
  HomeScreen: undefined;
  MapScreen: undefined;
  EatsScreen: undefined;
  NavigateCardScreen: undefined;
  RideOptionsCardScreen: undefined;
  Loginscreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList >();

export function Routes() {
  const user = useUserStore(state => state.user)

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {user.name ?  (
        <>
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={ScreenOptions} />
          <Stack.Screen name='MapScreen' component={MapScreen} options={ScreenOptions} />
          <Stack.Screen name='EatsScreen' component={EatsScreen} options={ScreenOptions} />
        </>
      ) : (
        <>
          <Stack.Screen name='Loginscreen' component={LoginScreen} options={ScreenOptions} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  );
}