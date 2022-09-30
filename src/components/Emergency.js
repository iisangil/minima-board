import { useContext } from 'react';
import { Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { SettingsContext } from '../context/settingsContext';

const Emergency = () => {
  const { settings } = useContext(SettingsContext);

  const callEmergency = () => {
    Linking.openURL(`tel:911`);
  }

  return settings["Theme"] == 'Light' ? (
      <AntDesign name="phone" size={24} color="black" onPress={callEmergency} />
    ) : (
      <AntDesign name="phone" size={24} color="white" onPress={callEmergency} />
    );
}

export default Emergency;