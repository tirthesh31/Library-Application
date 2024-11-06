import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { LogBox,StyleSheet } from 'react-native';

LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been extracted']); 

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
