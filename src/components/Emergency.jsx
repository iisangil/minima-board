import { useContext } from 'react';
import { Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { SettingsContext } from '../context/settingsContext';

const Emergency = () => {
  const { settings } = useContext(SettingsContext);

  const callEmergency = () => {
    Linking.openURL(`tel:911`);
  }

  return settings['Emergency'] ? (
    <AntDesign name='phone' size={42} color={settings['Theme'] == 'Light' ? 'black' : 'white'} onPress={callEmergency} />
  ) : <></>;
}

export default Emergency;