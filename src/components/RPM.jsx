import { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SettingsContext, storage } from '../context/settingsContext';
import { styles } from '../components/Styles';

// export var isHigh = false;
// If the current RPM is above this threshold then an alert should be set
// Default 2000
export var rpmThreshold = 2000
// var currentRPM

// export const updateRPM = (rpm) => {
//   isHigh = rpm > rpmThreshold
//   currentRPM = rpm
// }

export const changeRPMThreshold = (threshold) => {
  rpmThreshold = threshold
  isHigh = currentRPM > rpmThreshold
}

const RPM = (show) => {
  const { settings, setSettings } = useContext(SettingsContext);

  rpmThreshold = settings["RPMThreshold"] ?? 2000;

  let isHigh = settings['rpmHigh'] || false;
  let currentRPM = settings['rpmLevel'] ?? 1500;

  useEffect(() => {
    let newSettings = Object.assign({}, settings);
    newSettings['rpmHigh'] = isHigh;
    newSettings['rpmLevel'] = currentRPM;

    if (!newSettings['RPMThreshold']) {
      newSettings['RPMThreshold'] = 2000;
    }

    setSettings(newSettings);

    storage.save({
      key: 'settings',
      data: newSettings,
    });
  }, []);

  const rpmInfo = () => {
    console.log("RPM: ", currentRPM);
  }

  let textStyle = Object.assign({}, styles.text);
  textStyle['color'] = settings["FontColor"];
  let subtextStyle = Object.assign({}, styles.subText);
  subtextStyle['color'] = settings["FontColor"];

  return isHigh || show ? (
    <View>    
      <FontAwesome name="tachometer" size={42} color={settings["FontColor"]} onPress={rpmInfo}>
        <Text style={textStyle}> {currentRPM}</Text>
        <Text style={subtextStyle}>RPMs</Text>
      </FontAwesome>
    </View>

  ) : <></>;
}

export default RPM;