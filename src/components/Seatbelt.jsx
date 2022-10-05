import { useContext } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingsContext } from '../context/settingsContext';
import { styles } from '../components/Styles';

var isSeatbeltOn = false;

export const updateSeatbelt = (isOn) => {
  isSeatbeltOn = isOn
}

const Seatbelt = () => {
  const { settings } = useContext(SettingsContext);

  const seatbeltInfo = () => {
    console.log("Seatbelt: ", isSeatbeltOn);
  }

  return (settings['Seatbelt'] && !isSeatbeltOn) ? (
    <View>    
      <MaterialCommunityIcons name="seatbelt" size={42} color={settings['Theme'] == 'Light' ? 'black' : 'white'} onPress={seatbeltInfo}/>
    </View>

  ) : <></>;
}

export default Seatbelt;