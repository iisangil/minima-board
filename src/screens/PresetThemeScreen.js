import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Pressable} from 'react-native';
import { SettingsContext, storage } from '../context/settingsContext';
import { useContext } from 'react';
import { styles } from '../components/Styles';

export function PresetThemeScreen({navigation}){
    const { settings, setSettings } = useContext(SettingsContext);

    const setTheme = (theme) => {
        var background
        var fontColor
        if(theme === 'light') {
            background = '#ffffff'
            fontColor = '#000000'
        } else if (theme === 'dark') {
            background = '#121212'
            fontColor = '#8E8E93'
        } else if (theme === 'polar') {
            background = '#2E3440'
            fontColor = '#4C566A'
        } else if (theme === 'snow') {
            background = '#D8DEE9'
            fontColor = '#667799'
        }

        let newSettings = Object.assign({}, settings);

        newSettings['Background'] = background;
        newSettings['FontColor'] = fontColor;

        setSettings(newSettings);
        console.log("NEWSETTINGS", newSettings);
    
        storage.save({
          key: 'settings',
          data: newSettings
        });
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 32,borderRadius: 4, elevation: 3, backgroundColor:'#F2F2F7'}} onPress={() => setTheme('light')}>
            <Text style={{fontSize:'32', color:'#000000'}}>Light Mode</Text>
        </Pressable>
        <Pressable style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 32,borderRadius: 4, elevation: 3, backgroundColor:'#121212'}} onPress={() => setTheme('dark')}>
            <Text style={{fontSize:'32', color:'#8E8E93'}}>Dark Mode</Text>
        </Pressable>
        <Pressable style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 4, elevation: 3, backgroundColor:'#2E3440'}} onPress={() => setTheme('polar')}>
            <Text style={{fontSize:'32', color:'#4C566A'}}>Polar Night</Text>
        </Pressable>
        <Pressable style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 4, elevation: 3, backgroundColor:'#D8DEE9'}} onPress={() => setTheme('snow')}>
            <Text style={{fontSize:'32', color:'#667799'}}>Snow Storm</Text>
        </Pressable>
        <Button title="Back to Settings" color={settings["FontColor"]} onPress={() => navigation.navigate('Settings')} />
      </View>
    );
  }