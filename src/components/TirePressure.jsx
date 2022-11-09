import { useContext } from 'react';
import { Modal} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingsContext } from '../context/settingsContext';

var isLow = false;
// If the current tire pressure psi is below this threshold then an alert should be set
var pressureThreshold = 30
var currentPressure

// Pass it the tire pressure and if it's below the threshold then turn on the alert
export const updateTirePressure = (pressure) => {
  isLow = pressure < pressureThreshold
  currentPressure = pressure
  console.log("Tire Pressure: ", currentPressure)
}

const TirePressure = () => {
  const { settings } = useContext(SettingsContext);

  const tirePressureInfo = () => {
    console.log("Tire Pressure: ", currentPressure);
  }

  return isLow ? (
    <MaterialCommunityIcons name="car-tire-alert" size={42} color={settings["FontColor"]}  onPress={tirePressureInfo} />
  ) : <></>;
}

export default TirePressure;