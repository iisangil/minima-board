import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, StatusBar, Platform} from 'react-native';

const statusBarHeight = Platform.OS === 'ios' ? 35 : 0
const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif'

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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navBar: {
      backgroundColor: '#8c231c',
      height: 44 + statusBarHeight,
      alignSelf: 'stretch',
      paddingTop: statusBarHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navBarTitle: {
      color: 'white',
      fontFamily,
      fontSize: 17,
    },
    heroContainer: {
      marginTop: 40,
      marginBottom: 50,
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#ccc',
      flexDirection: 'row',
    },
    heroImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: 'black',
      marginHorizontal: 20,
    },
    heroTitle: {
      fontFamily,
      color: 'black',
      fontSize: 24,
      marginHorizontal: 24
    },
    heroSubtitle: {
      fontFamily,
      color: '#999',
      fontSize: 14,
    }
  })