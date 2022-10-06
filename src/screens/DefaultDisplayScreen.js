import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import Speed from '../components/Speed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {styles} from '../components/Styles.js';
import SpeedDisplay from '../components/Speed';

export function DefaultDisplayScreen({navigation}){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SpeedDisplay/>
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }