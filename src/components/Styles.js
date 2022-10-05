import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, StatusBar} from 'react-native';

export const styles = StyleSheet.create({
    text: {
      color: "black",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
    },
    subText: {
      color: "black",
      fontSize: 14,
      lineHeight: 84,
      textAlign: "center",
    },
    titleText:{
      fontSize: 50,
      fontWeight: "bold",
      color: "#00274C", 
      alignItems: 'center', 
      justifyContent: 'center'
      
    }, 
    headerText: {
      color: "black",
      fontSize: 20,
      lineHeight: 50,
      fontWeight: "bold",
      alignSelf: "left",
      marginHorizontal: 50
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    button:{
      alignSelf: 'center',
      position: 'absolute',
      bottom: 35
    },
    input: {
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1 
    },
  })