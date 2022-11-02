import React, { useEffect, useState } from 'react';

import ReactDOM from "react-dom";
import { View, Text, Button} from 'react-native';
import { 
  NavigationContainer 
} from '@react-navigation/native';
// import Geolocation from '@react-native-community/geolocation';
import * as Location from 'expo-location';

function SpeedDisplay(){
  // State to store count value
  const [count, setCount] = useState(0);

  // Function to increment count by 1
  const incrementCount = () => {
    // Update state with incremented value
    setCount(count + 1);
  };
  // Function to decrement count by 1
  const decrementCount = () => {
    if (count > 0){
      setCount(count - 1);
    }
  };

  const color = count < 15 ? 'green' : count > 20 ? 'red' : 'orange';

    // Function to get actual speed
    const actualSpeed = async () => {
      // Geolocation.getCurrentPosition(info => console.log(info));
      // Geolocation.watchPosition(info => console.log(info));
      // setCount(Geolocation.watchPosition(position.coords.speed))
      if (await Location.requestForegroundPermissionsAsync()) {

        let watchID = Location.watchPositionAsync(
          { accuracy: 6, timeInterval: 5000, distanceInterval: 0 },
          (position) => {
            // console.log(position);
            // console.log(position.coords.speed);
            position.coords.speed < 1 ? setCount(0): setCount(position.coords.speed);
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
    {/* <Button
          title="Increment Speed"
          onPress={() => incrementCount()}
        />
    <Button
        title="Decrement Speed"
        onPress={() => decrementCount()}
    /> */}
    {/* <Button
        title="Find Speed"
        onPress={() => actualSpeed()}
    /> */}
    {/* <button onClick={incrementCount}>increment speed</button>
    <button onClick={decrementCount}>decrement speed</button> */}
    </View>

  );
}

export default SpeedDisplay;