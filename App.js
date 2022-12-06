import * as React from 'react';
import { View, Button } from 'react-native';
import { 
  DefaultTheme,
  DarkTheme,
  NavigationContainer 
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation'
import DialogInput from 'react-native-dialog-input';

import { HomeScreen } from './src/screens/HomeScreen';
import { BaseDisplayScreen } from './src/screens/BaseDisplayScreen.jsx';
import { DefaultDisplayScreen } from './src/screens/DefaultDisplayScreen.js';
import ApplicationScreen from './src/screens/ApplicationScreen';
import FeaturesScreen from './src/screens/FeaturesScreen';
import DeveloperScreen from './src/screens/DeveloperScreen';
import GasCustomizationScreen from './src/screens/GasCustomizationScreen';

import { ColorCustomizationScreen } from './src/screens/ColorCustomizationScreen';
import { FontCustomizationScreen } from './src/screens/FontCustomizationScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import { PresetThemeScreen } from './src/screens/PresetThemeScreen';
import { HelpScreen } from './src/screens/HelpScreen';
import { CustomThemeScreen } from './src/screens/CustomThemeScreen'

import { SettingsContext, storage } from './src/context/settingsContext';

import {styles} from './src/components/Styles.js';
import LayoutScreen from './src/screens/LayoutScreen';

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

  const [show, setShow] = React.useState(false);

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

  var theme = {
    dark: false,
    colors: {
      primary: settings['Background'],
      background: settings['Background'],
      card: settings['FontColor'],
      text: settings['FontColor'],
      border: settings['Background'],
      notification: settings['FontColor'],
    },
  };

  const saveDisplay = (name) => {
    console.log("top level settings", settings);

    let newSettings = Object.assign({}, settings);
    let savedSettings = Object.assign({}, settings);
    delete savedSettings['savedSettings'];

    if (!newSettings['savedSettings']) {
      newSettings['savedSettings'] = {};
    }
    if (newSettings['savedSettings'].hasOwnProperty(name)) {
      setShow(false);
      alert('Name is being used. Try again');
      setShow(true);
      return;
    }
    else {
      setShow(false);
      newSettings['savedSettings'][name] = savedSettings;
      setSettings(newSettings);
      console.log('settings after save', newSettings);

      storage.save({
        key: 'settings',
        data: newSettings,
      });

      alert('Successfully saved!');
    }
  }

  return (
      <SettingsContext.Provider value={settingsData} >

      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={FeaturesScreen} />
          <Stack.Screen name="Display" component={BaseDisplayScreen} />
          <Stack.Screen name="DefaultDisplay" component={DefaultDisplayScreen} />
          <Stack.Screen name="Application" component={ApplicationScreen} />
          <Stack.Screen name="Developer" component={DeveloperScreen} />
          <Stack.Screen name="GasMode" component={GasCustomizationScreen} />
          <Stack.Screen name = "ColorCustomization" component={ColorCustomizationScreen}/>
          <Stack.Screen name = "PresetThemes" component={PresetThemeScreen}/>
          <Stack.Screen name = "FontCustomization" component={FontCustomizationScreen}/>
          <Stack.Screen name = "CustomThemes" component={CustomThemeScreen}/>
          <Stack.Screen name='Contacts' component={ContactsScreen} />
          <Stack.Screen name='Layout' component={LayoutScreen}
          options={{
            headerRight: () => (
              <View>
                <DialogInput
                isDialogVisible={show}
                title={"Save Layout"}
                message={"Please enter a name for this layout"}
                hintInput ={"Layout Name"}
                submitInput={ (inputText) => {
                  console.log(inputText);
                  
                  saveDisplay(inputText);
                }}
                closeDialog={() => setShow(false)}
                >
                </DialogInput>
                <Button
                onPress={() => {
                  console.log(show);
                  setShow(true);
                }}
                title='Save'
                />
              </View>
            ),
          }} />
          <Stack.Screen name = 'Help' component={HelpScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      </SettingsContext.Provider>

    
  );
}



export default App;