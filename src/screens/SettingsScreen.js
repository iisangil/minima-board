import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { SettingsContext } from '../context/settingsContext';

import { styles } from '../components/Styles';

export function SettingsScreen({ navigation }) {
  const { settings, setSettings } = React.useContext(SettingsContext);

  const changeTheme = () => {
    let newSettings = Object.assign({}, settings);
    newSettings["Theme"] = settings["Theme"] == "Light" ? "Dark" : "Light";
    setSettings(newSettings);
  }

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Button title="Switch Theme" onPress={changeTheme} />
        <Button title="Select Features" onPress={() => navigation.navigate('Features')} />

        <View style = {styles.button}>
          <Button title='Back to Home' onPress={() => navigation.navigate('Home')} />
        </View>
        
      </View>
  );
}