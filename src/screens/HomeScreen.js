import * as React from 'react';
import { View, Text, Button, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {styles} from '../components/Styles.js';

// const bkimage = { uri: "https://media.giphy.com/media/UfACric1lpLgdP3wtC/giphy.gif"};
import bkimage from '../images/minima_board.gif';

export function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1}}>
      <ImageBackground source={bkimage} resizeMode="cover" style={styles.image}>
        
        <View style={styles.homeScreen}>
          <Button
            title="Change Settings"
            onPress={() => navigation.navigate('Settings')}
          />
          <Button
            title="Choose Display"
            onPress={() => navigation.navigate('Display')}
          />
          <Button
          title="Start Application"
          onPress={() => navigation.navigate("Application")}
          />
        </View>
        
        <View style={styles.button}>
            <Button
            title="Developer Tools"
            onPress={() => navigation.navigate("Developer")}
            />
        </View>
        
      </ImageBackground>
      
    </View>
  );
}