import { useContext } from 'react';
import { Modal} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingsContext } from '../context/settingsContext';

const Seatbelt = () => {
  const { settings } = useContext(SettingsContext);

  const tirePressureInfo = () => {
    Linking.openURL(`tel:911`);
  }

  return settings['Seatbelt'] ? (
    <MaterialCommunityIcons name="car-tire-alert" size={24} color={settings['Theme'] == 'Light' ? 'black' : 'white'} onPress={tirePressureInfo} />
  ) : <></>;
}

export default Seatbelt;