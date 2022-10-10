import { useContext } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SettingsContext } from '../context/settingsContext';
import { styles } from '../components/Styles';

var isLow = false;
// If the current gas level % is below this threshold then an alert should be set
// Default 25%
var gasThreshold = 25
var currentGas

export const updateGasLevel = (gasLevel) => {
  isLow = gasLevel < gasThreshold
  currentGas = gasLevel
}

const Gas = () => {
  const { settings } = useContext(SettingsContext);

  const gasInfo = () => {
    console.log("Gas Level: ", currentGas);
  }

  return (settings['Gas'] && isLow) ? (
    <View>    
      <FontAwesome5 name="gas-pump" size={42} color={settings['Theme'] == 'Light' ? 'black' : 'white'} onPress={gasInfo}>
        <Text style={styles.text}> {currentGas}</Text>
        <Text style={styles.subText}>%</Text>
      </FontAwesome5>
    </View>

  ) : <></>;
}

export default Gas;