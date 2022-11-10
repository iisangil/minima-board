import React, { useEffect, useState } from 'react';

import ReactDOM from "react-dom";
import { View, Text, Button} from 'react-native';
import { 
  NavigationContainer 
} from '@react-navigation/native';
import * as Location from 'expo-location';

function SpeedDisplay(){
  // State to store count value
  const [count, setCount] = useState(0);

  const color = count < 15 ? 'green' : count > 20 ? 'red' : 'orange';

    // Function to get actual speed
    const actualSpeed = async () => {
      if (await Location.requestForegroundPermissionsAsync()) {

        let watchID = Location.watchPositionAsync(
          { accuracy: 6, timeInterval: 5000, distanceInterval: 0 },
          (position) => {
             // console.log(position.coords.speed);
            position.coords.speed < 1 ? setCount(0): setCount(parseInt(position.coords.speed));
          }
        );
      }
    };

  useEffect(() => {
    actualSpeed();
  }, []);
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: '40px', fontWeight: 'bold', color: color, }}> {count} mph </Text>
    </View>

  );
}

export default SpeedDisplay;