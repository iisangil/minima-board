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
import { DefaultDisplayScreen } from './src/screens/DefaultDisplayScreen.js';
import ApplicationScreen from './src/screens/ApplicationScreen';
import FeaturesScreen from './src/screens/FeaturesScreen';
import DeveloperScreen from './src/screens/DeveloperScreen';

import { SettingsContext } from './src/context/settingsContext';

import {styles} from './src/components/Styles.js';

const warn = console.warn;

function logWarning(...warnings){
  let showWarning = true;
  warnings.forEach(warning => {
    if (warning.includes("UNSAFE_")) showWarning = false;
    else if (warning.includes("SourceMap")) showWarning = false;
    else if (warning.includes("DevTools")) showWarning = false;
  });
  if(showWarning) warn(...warnings);
}


console.warn  = logWarning;

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
          <Stack.Screen name="DefaultDisplay" component={DefaultDisplayScreen} />
          <Stack.Screen name="Application" component={ApplicationScreen} />
          <Stack.Screen name="Features" component={FeaturesScreen} />
          <Stack.Screen name="Developer" component={DeveloperScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </SettingsContext.Provider>
  );
}



export default App;