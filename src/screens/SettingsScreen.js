import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { SettingsContext } from '../context/settingsContext';

export function SettingsScreen({ navigation }) {
  const { settings, setSettings } = React.useContext(SettingsContext);

  const changeTheme = () => {
    let newSettings = Object.assign({}, settings);
    newSettings["Theme"] = settings["Theme"] == "Light" ? "Dark" : "Light";
    console.log("CHANGING THEME");
    console.log("SETTINGS", settings, "NEW SETTINGS", newSettings);
    setSettings(newSettings);
  }

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/*<Button
          title="Go back to Settings"
          onPress={() => navigation.push('Settings')}
        />*/}
        <Button title="Switch Theme" onPress={changeTheme} />
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
        
        {/*<Button title="Go back" onPress={() => navigation.goBack()} />*/}
        {/*<Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />*/}
      </View>
  );
}