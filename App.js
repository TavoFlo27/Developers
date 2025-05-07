import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Bukhari: require('./assets/fonts/BukhariScript.ttf'),
        OpenSansBold: require('./assets/fonts/OpenSans.ttf'),
        MoreSugarExtra: require('./assets/fonts/MoreSugarExtra.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Puedes personalizar esto con tu propio Splash
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <StackNavigator />
    </PaperProvider>
  );
}
