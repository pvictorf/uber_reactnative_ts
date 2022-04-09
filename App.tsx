import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Routes } from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Routes />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

