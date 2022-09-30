import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';

export const ThemeContext = React.createContext();

export function SettingsScreen({ navigation }) {
  const { setTheme, theme } = React.useContext(ThemeContext);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/*<Button
            title="Go back to Settings"
            onPress={() => navigation.push('Settings')}
          />*/}
          <Button title="Switch Theme" onPress={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')} />
          <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
          
          {/*<Button title="Go back" onPress={() => navigation.goBack()} />*/}
          {/*<Button
            title="Go back to first screen in stack"
            onPress={() => navigation.popToTop()}
          />*/}
        </View>
    );
  }