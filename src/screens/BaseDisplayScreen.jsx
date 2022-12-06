import { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext, storage } from '../context/settingsContext.js';

import {styles} from '../components/Styles.js';

export function BaseDisplayScreen({navigation}){
  const { settings, setSettings } = useContext(SettingsContext);
  let savedSettings = settings['savedSettings'] ?? {};
  let keys = Object.keys(savedSettings);
  
  console.log('base', savedSettings, keys);

  const loadDisplay = (key) => {
    let newSettings=  Object.assign({}, savedSettings[key]);
    console.log(key, savedSettings[key]);

    newSettings['savedSettings'] = savedSettings;

    setSettings(newSettings);

    storage.save({
      key: 'settings',
      data: newSettings,
    })

    navigation.navigate('Application');
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
          keys.length != 0 ? (
            keys.map((key) => (
              <Button title={key} onPress={() => loadDisplay(key)} />
            ))
          ) : ''
        }
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }