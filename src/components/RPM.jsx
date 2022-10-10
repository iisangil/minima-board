import { useContext } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SettingsContext } from '../context/settingsContext';
import { styles } from '../components/Styles';

var isHigh = false;
// If the current RPM is above this threshold then an alert should be set
// Default 2000
var rpmThreshold = 2000
var currentRPM

export const updateRPM = (rpm) => {
  isHigh = rpm > rpmThreshold
  currentRPM = rpm
}

const RPM = () => {
  const { settings } = useContext(SettingsContext);

  const rpmInfo = () => {
    console.log("RPM: ", currentRPM);
  }

  return (settings['RPM'] && isHigh) ? (
    <View>    
      <FontAwesome name="tachometer" size={42} color={settings['Theme'] == 'Light' ? 'black' : 'white'} onPress={rpmInfo}>
        <Text style={styles.text}> {currentRPM}</Text>
        <Text style={styles.subText}>RPMs</Text>
      </FontAwesome>
    </View>

  ) : <></>;
}

export default RPM;