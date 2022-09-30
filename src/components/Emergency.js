import { useContext } from 'react';
import { Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ThemeContext } from '../screens/SettingsScreen';

const Emergency = () => {
  const { theme } = useContext(ThemeContext);

  const callEmergency = () => {
    Linking.openURL(`tel:911`);
  }

  return theme == 'Light' ? (
      <AntDesign name="phone" size={24} color="black" onPress={callEmergency} />
    ) : (
      <AntDesign name="phone" size={24} color="white" onPress={callEmergency} />
    );
}

export default Emergency;