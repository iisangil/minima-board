import * as React from 'react';
import { useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext, storage } from '../context/settingsContext';

import {styles} from '../components/Styles.js';
import PickerComponent from '../components/ColorPicker.js';
import { SelectType } from '../components/ColorPicker.js';

export function ColorCustomizationScreen({navigation}){

  const { settings, setSettings } = useContext(SettingsContext);

  const selectColorType = () => {
    
    let newSettings = Object.assign({}, settings);

    newSettings['colorType'] = 'Background';

    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);

    storage.save({
      key: 'settings',
      data: newSettings
    });

  } 

  useEffect(() => {
    // SelectType("Background");
    selectColorType();
  }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PickerComponent/>
        <Button title="Back to Home" onPress={() => navigation.navigate('Settings')} />
      </View>
    );
  }