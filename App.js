import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

import { Colors } from './src/Styles';
import StackNavigator from './src/screens/index';
import { Provider as CheckpointsProvider } from './src/providers/Checkpoints';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={Colors.foreground} barStyle='light-content' />
      <NavigationContainer>
        {StackNavigator()}
      </NavigationContainer>
    </>
  );
}

export default () => {
  return (
    <CheckpointsProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </CheckpointsProvider>
  );
};