import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import{HomeScreen} from './src/screens/HomeScreen';
import{BaseDisplayScreen} from './src/screens/BaseDisplayScreen.js';
import{SettingsScreen} from './src/screens/SettingsScreen.js';

import {styles} from './src/components/Styles.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Display" component={BaseDisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;