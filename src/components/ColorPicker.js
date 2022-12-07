import {ColorPicker} from 'react-native-color-picker'
import Slider from '@react-native-community/slider';
import { Button, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import { SettingsContext, storage } from '../context/settingsContext';
import { styles } from '../components/Styles';
import { useContext } from 'react';
import { ImageBackground, View, Switch, Text, SectionList, SafeAreaView, StatusBar, Platform, RefreshControl } from 'react-native';
import { watchPositionAsync } from 'expo-location';

// import {settings, setSettings} from "../screens/FeaturesScreen";

  const renderHero = () => (
    <View style={styles.heroContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heroTitle}>Settings </Text>
      </View>
    </View>
  )

var type = "Background"

export const SelectType = (newType) => {
  type = newType
  console.log(type)
}

const PickerComponent = (component) => {

    const { settings, setSettings } = useContext(SettingsContext);
    type = settings["colorType"];


    // let textStyle = Object.assign({}, styles.text);
    // textStyle['color'] = settings["FontColor"];

    
    const selectColor = (color, type) => {
        console.log("========================the type=======================");
        console.log(type);
        let newSettings = Object.assign({}, settings);

        newSettings[type] = color;

        setSettings(newSettings);
        console.log("NEWSETTINGS", newSettings);
    
        storage.save({
          key: 'settings',
          data: newSettings
        });

        alert(`Color selected: ${color}`)

      } 

    return (
        <View>
            <Text style={{color: settings['FontColor'], fontSize: 25, lineHeight: 84, fontWeight: "bold", textAlign: "center"}}>
                Click circle to save
            </Text>
            <ColorPicker
            sliderComponent={Slider}
            onColorSelected={color => selectColor(color, type)}
            style={styles.colorContainer}
        />
        </View>
    )
}

export default PickerComponent