import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {styles} from '../components/Styles.js';
import PickerComponent from '../components/ColorPicker.js';

export function ColorCustomizationScreen({navigation}){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <PickerComponent/>
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }