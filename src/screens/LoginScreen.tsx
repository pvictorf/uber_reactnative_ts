import { useState } from 'react';
import { SafeAreaView, View, ImageBackground, TouchableOpacity, Text, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { useUserStore } from '../stores/UserStore';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'

// import loginBackground from '../../assets/login_background.png';
import { UberLogo } from '../components/UberLogo';

export const LoginScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const setUser = useUserStore(state => state.setUser)

  async function handleClick() {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setUser({
        name,
        phone,
        location: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
      });
      navigation.navigate('HomeScreen')
    } catch {
      setLoading(false)
    }
  }

  function disableSigninButton() {
    return loading || (!name || !phone) 
  }

  return (
    <SafeAreaView style={[tw`bg-white`]}> 
      <View style={tw`p-5 h-full justify-between bg-white opacity-90`}>
        <UberLogo />
        <View style={tw`justify-center`}>
          <TextInput
            placeholder='Your name'
            style={tw`border-2 p-3 my-2 rounded-md text-lg  bg-white`}
            onChangeText={value => setName(value)}
            value={name}
          />
          <TextInput
            placeholder='Phone'
            style={tw`border-2 p-3 my-2 rounded-md text-lg  bg-white`}
            keyboardType='numeric'
            onChangeText={value => setPhone(value)}
            value={phone}
          />
          <TouchableOpacity 
            onPress={handleClick} 
            style={tw`bg-black py-4 my-2 rounded-md ${disableSigninButton() ? 'opacity-60' : 'opacity-100'}`}
            disabled={disableSigninButton()}
          >
            <Text style={tw`text-white text-center `}>
              {!loading ? 'Signin' : 'Loading...'}
            </Text>
          </TouchableOpacity>
        </View>
        <View />
      </View>
    </SafeAreaView>
  );
}
