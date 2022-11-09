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

  let textStyle = Object.assign({}, styles.text);
  textStyle['color'] = settings["FontColor"];
  let subtextStyle = Object.assign({}, styles.subText);
  subtextStyle['color'] = settings["FontColor"];

  return isLow ? (
    <View>    
      <FontAwesome5 name="gas-pump" size={42} color={settings["FontColor"]} onPress={gasInfo}>
      <Text style={textStyle}> {currentGas}</Text>
      <Text style={subtextStyle}>%</Text>
      </FontAwesome5>
    </View>

  ) : <></>;
}

export default Gas;