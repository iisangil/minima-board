import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';

export const styles = StyleSheet.create({
    text: {
      color: "black",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
    },
    titleText:{
      fontSize: 50,
      fontWeight: "bold",
      color: "#00274C", 
      alignItems: 'center', 
      justifyContent: 'center'
      
    }, 
    image: {
      flex: 1,
      justifyContent: "center"
    },
    rightText:{
      flexDirection: 'row', 
      alignItems: 'center',
      marginHorizontal: 25
    }
  })