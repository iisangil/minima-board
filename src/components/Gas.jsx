import { useContext } from 'react';
import { Modal} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingsContext } from '../context/settingsContext';

const Gas = () => {
  const { settings } = useContext(SettingsContext);

  const tirePressureInfo = () => {
    Linking.openURL(`tel:911`);
  }

  return settings['Gas'] ? (
    <MaterialCommunityIcons name="car-tire-alert" size={24} color={settings['Theme'] == 'Light' ? 'black' : 'white'} onPress={tirePressureInfo} />
  ) : <></>;
}

export default Gas;