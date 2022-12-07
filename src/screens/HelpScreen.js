import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from 'react-native-onboarding-swiper';

import {styles} from '../components/Styles.js';
import bkimage from '../images/minima_board.gif';

const Done = ({ isLight, ...props }) => (
    <Button
      title={"Back to Home"}
      buttonStyle={{}}
      containerViewStyle={{
        marginVertical: 10,
        width: 40
      }}
      textStyle={{ color: "black" }}
      type="clear"
      {...props}
    />
  );

  const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
    } else {
      backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
    }
    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor
        }}
      />
    );
  };

export function HelpScreen({navigation}){
    return (
        <Onboarding
        DotComponent={Square}
        skipToPage={8}
        DoneButtonComponent={Done}
        onDone={()=> {
            navigation.navigate("Home")
        }}
        titleStyles={{ fontSize: 25, fontWeight: "700" }}
        subTitleStyles={{ fontSize: 16 }}
        pages={[
          {
            backgroundColor: '#8DC8E4',
            image: <Image source={require('../images/logo_small.gif')} />,
            title: 'Welcome!',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'A short tutorial on how to use Minima-Board',
          }, 
          {
            backgroundColor: '#8DC8E4',
            image: <Image style={{position: 'relative', bottom: 50, marginVertical: -100}} source={require('../images/visual.png')} />,
            title: 'Settings: Visual',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'Customize colors by choosing a preset color palette or by using the color wheel',
          }, 
          {
            backgroundColor: '#8DC8E4',
            image: <Image style={{position: 'relative', bottom: 50, marginVertical: -70}} source={require('../images/switches.png')} />,
            title: 'Settings: Alerts',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'Change alert icons using the drop down menu and toggle alerts on/off using the switches',
          }, 
          {
            backgroundColor: '#8DC8E4',
            image: <Image source={require('../images/threshold.png')} />,
            title: 'Settings: Thresholds',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'Set upper limit thresholds by typing in the text box by each setting',
          }, 
          {
            backgroundColor: '#8DC8E4',
            image: <Image style={{position: 'relative', bottom: 50, marginVertical: -70}} source={require('../images/calling.png')} />,
            title: 'Settings: Calling & Emergency',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'Enable emergency calling and select quick-contacts by using the search bar or scrolling the page',
          }, 
          {
            backgroundColor: '#8DC8E4',
            image: <Image style={{position: 'relative', bottom: 50, marginVertical: -80}} source={require('../images/layout.png')} />,
            title: 'Settings: Customize Display layout',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'Customize display layout by holding and dragging icons on the screen, or reset layout to default',
          }, 
          {
            backgroundColor: '#8DC8E4',
            image: <Image style={{position: 'relative', bottom: 50, marginVertical: -60}} source={require('../images/themes.png')} />,
            title: 'Settings: Save Custom Theme',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'Save your custom theme and use the drop down to select it',
          },
          {
            backgroundColor: '#8DC8E4',
            image: <Image style={{position: 'relative', bottom: 50, marginVertical: -60}} source={require('../images/select.png')} />,
            title: 'Displays: selecting',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'Choose a preset display or a saved custom display',
          }, 
          {
            backgroundColor: '#8DC8E4',
            image: <Image source={require('../images/start.png')} />,
            title: 'Starting the App',
            titleStyles: {fontWeight: 'bold'},
            subtitle: 'After selecting a display and choosing your settings, start the app by pressing "Start Application"',
          }, 
        ]}
      />
    );
  }