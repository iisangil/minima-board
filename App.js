import * as React from 'react';
import * as reactNative from 'react-native';
import { 
  DefaultTheme,
  DarkTheme,
  NavigationContainer 
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/screens/HomeScreen';
import { BaseDisplayScreen } from './src/screens/BaseDisplayScreen.js';
import { SettingsScreen } from './src/screens/SettingsScreen.js';
import ApplicationScreen from './src/screens/ApplicationScreen';

import { SettingsContext } from './src/context/settingsContext';

import {styles} from './src/components/Styles.js';

const Stack = createNativeStackNavigator();

function App() {
  const [settings, setSettings] = React.useState({"Theme": "Light"})
  const settingsData = { settings, setSettings };

  return (
    <SettingsContext.Provider value={settingsData} >
      <NavigationContainer theme={settings["Theme"] == "Light" ? DefaultTheme : DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Display" component={BaseDisplayScreen} />
          <Stack.Screen name="Application" component={ApplicationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </SettingsContext.Provider>
  );
}



export default App;