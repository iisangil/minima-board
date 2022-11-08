import * as React from 'react';
import * as reactNative from 'react-native';
import {View} from 'react-native';
import { 
  DefaultTheme,
  DarkTheme,
  NavigationContainer 
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation'

import { HomeScreen } from './src/screens/HomeScreen';
import { BaseDisplayScreen } from './src/screens/BaseDisplayScreen.js';
import { DefaultDisplayScreen } from './src/screens/DefaultDisplayScreen.js';
import ApplicationScreen from './src/screens/ApplicationScreen';
import FeaturesScreen from './src/screens/FeaturesScreen';
import DeveloperScreen from './src/screens/DeveloperScreen';
import { ColorCustomizationScreen } from './src/screens/ColorCustomizationScreen';
import ContactsScreen from './src/screens/ContactsScreen';

import { SettingsContext, storage } from './src/context/settingsContext';

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

  React.useEffect(() => {
    const lockScreen = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    lockScreen();
  }, [])

  storage.load({
    key: 'settings',
    autoSync: true
  }).then(ret => {
    setSettings(ret)
  })
  .catch(err => {
    // any exception including data not found
    // goes to catch()
    console.warn(err.message);
  });


  return (
      <SettingsContext.Provider value={settingsData} >

      <NavigationContainer theme={settings["Theme"] == "Light" ? DefaultTheme : DarkTheme}>
        
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={FeaturesScreen} />
          <Stack.Screen name="Display" component={BaseDisplayScreen} />
          <Stack.Screen name="DefaultDisplay" component={DefaultDisplayScreen} />
          <Stack.Screen name="Application" component={ApplicationScreen} />
          <Stack.Screen name="Developer" component={DeveloperScreen} />
          <Stack.Screen name = "ColorCustomization" component={ColorCustomizationScreen}/>
          <Stack.Screen name='Contacts' component={ContactsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </SettingsContext.Provider>

    
  );
}



export default App;