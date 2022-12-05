import React, { useContext, useState } from 'react';
import { View, Text, Button} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SettingsContext } from '../context/settingsContext';
import { styles } from '../components/Styles';
import RNSpeedometer from 'react-native-speedometer'


export var isLow = false;
// If the current gas level % is below this threshold then an alert should be set
// Default 25%
var gasThreshold = 25
var currentGas = 100


export const updateGasLevel = (gasLevel) => {
  isLow = gasLevel < gasThreshold
  currentGas = gasLevel
}

function Gas() {
  const { settings, setSettings } = useContext(SettingsContext);
  console.log('settings in gas', settings);
  // State to store gas value
  const [gasLevel, setGas] = useState(100);

  // Function to increment gas percent by 1
  const incrementCount = () => {
    // Update state with incremented value
    if (gasLevel < 100){
      setGas(gasLevel + 1);
      updateGasLevel(gasLevel);

      let newSettings = Object.assign({}, settings);
      newSettings['gasLow'] = isLow;
    
      setSettings(newSettings);

      storage.save({
        key: 'settings',
        data: newSettings,
      })
    }
  };
  // Function to decrement gas percent by 1
  const decrementCount = () => {
    if (gasLevel > 0){
      setGas(gasLevel - 1);
      updateGasLevel(gasLevel);

      let newSettings = Object.assign({}, settings);
      newSettings['gasLow'] = isLow;
    
      setSettings(newSettings);
      
      storage.save({
        key: 'settings',
        data: newSettings,
      })
    }
  };

  const gasInfo = () => {
    console.log("Gas Level: ", currentGas);
  }

  let textStyle = Object.assign({}, styles.text);
  textStyle['color'] = settings["FontColor"];
  let subtextStyle = Object.assign({}, styles.subText);
  subtextStyle['color'] = settings["FontColor"];

  return (settings["GasMode"] == 2 && isLow) ? (
    <View>    
      <FontAwesome5 name={"gas-pump"} size={42} color={settings['FontColor'] ? settings['FontColor'] : '#808080'} onPress={gasInfo}>
      <Text style={textStyle}> {currentGas}</Text>
      <Text style={subtextStyle}>%</Text>
      </FontAwesome5>
    </View>
  ) : (settings["GasMode"] == 3) ?
  (<View>    
  <FontAwesome5 name="gas-pump" size={42} color={settings['FontColor'] ? settings['FontColor'] : '#808080'} onPress={gasInfo}>
    <Text style={styles.text}> {currentGas}</Text>
    <Text style={styles.subText}>%</Text>
  </FontAwesome5>
    <Button
      title="Increment"
      onPress={() => incrementCount()}
    />
    <Button
        title="Decrement"
        onPress={() => decrementCount()}
    />

</View>
) : (settings["GasMode"] == 4) ?
  (<View style={styles.gasContainer}>  
      <RNSpeedometer value={gasLevel} size={100}/>
  </View>) :
  <></>;
}

export default Gas;