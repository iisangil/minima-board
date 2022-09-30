import * as React from 'react';
import { View, Text, Button, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {styles} from '../components/Styles.js';

const bkimage = { uri: "https://img.freepik.com/free-vector/paper-style-white-monochrome-background_52683-66444.jpg?w=2000"};

export function HomeScreen({ navigation }) {
  return (
    <View style={{backgroundColor: '#FFCB05', flex:1}}>
      <ImageBackground source={bkimage} resizeMode="cover" style={styles.image}>
        <Text style ={styles.text}>Minima Board</Text>
        <Button
          title="Change Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <Button
          title="Choose Display"
          onPress={() => navigation.navigate('Display')}
        />
      </ImageBackground>
      
    </View>
  );
}