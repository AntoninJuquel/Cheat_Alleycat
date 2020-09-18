import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import { Colors } from './src/Styles';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={Colors.backgroundColor} barStyle='light-content' />
      <NavigationContainer>
        {StackNavigator()}
      </NavigationContainer>
    </>
  );
}

export default () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};