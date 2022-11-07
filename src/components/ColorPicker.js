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

const PickerComponent = () => {
    // state = {
    //     refreshing: false,
    //   }
    const { settings, setSettings } = useContext(SettingsContext);

    
    const selectColor = (color) => {

        let newSettings = Object.assign({}, settings);

        newSettings["Background"] = color;

        setSettings(newSettings);
        console.log("NEWSETTINGS", newSettings);
    
        storage.save({
          key: 'color',
          data: newSettings
        });

        alert(`Color selected: ${color}`)

      } 

    return (
        <View>
            <Text style={styles.colorText}>
                Click circle to save
            </Text>
            <ColorPicker
            sliderComponent={Slider}
            onColorSelected={color => selectColor(color)}
            style={styles.colorContainer}
        />
        </View>
    )
}

export default PickerComponent