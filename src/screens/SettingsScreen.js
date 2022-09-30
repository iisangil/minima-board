import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {styles} from '../components/Styles.js';

export function SettingsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/*<Button
          title="Go back to Settings"
          onPress={() => navigation.push('Settings')}
        />*/}
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
        
        {/*<Button title="Go back" onPress={() => navigation.goBack()} />*/}
        {/*<Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />*/}
      </View>
    );
  }