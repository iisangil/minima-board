import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import PickerComponent from '../components/ColorPicker.js';
import { SelectType } from '../components/ColorPicker.js';

export function FontCustomizationScreen({navigation}){
  SelectType("FontColor")
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PickerComponent/>
        <Button title="Back to Home" onPress={() => navigation.navigate('Settings')} />
      </View>
    );
  }