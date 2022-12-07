import * as React from 'react';
import { useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import PickerComponent from '../components/ColorPicker.js';
import { SelectType } from '../components/ColorPicker.js';
import { SettingsContext, storage } from '../context/settingsContext';

export function FontCustomizationScreen({navigation}){

  const { settings, setSettings } = useContext(SettingsContext);

  const selectColorType = () => {
    
    let newSettings = Object.assign({}, settings);

    newSettings['colorType'] = 'FontColor';

    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);

    storage.save({
      key: 'settings',
      data: newSettings
    });

  } 

  useEffect(() => {
    // SelectType("FontColor");
    selectColorType();
  }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PickerComponent/>
        <Button title="Back to Home" onPress={() => navigation.navigate('Settings')} />
      </View>
    );
  }