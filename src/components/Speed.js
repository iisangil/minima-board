import React, { useState } from "react";
import ReactDOM from "react-dom";
import { View, Text, Button} from 'react-native';
import { 
  NavigationContainer 
} from '@react-navigation/native';

export function SpeedDisplay(){
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
  
  return (
    <NavigationContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> {count} mph </Text>
      <button onClick={incrementCount}>increment speed</button>
      <button onClick={decrementCount}>decrement speed</button>
      </View>
    </NavigationContainer>

  );
}