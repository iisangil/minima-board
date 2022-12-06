import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SettingsContext, storage } from '../context/settingsContext';
import { styles } from '../components/Styles';
import RNSpeedometer from 'react-native-speedometer'


// export var isLow = false;
// If the current gas level % is below this threshold then an alert should be set
// Default 25%
export var gasThreshold = 25;
// var currentGas = 100


// export const updateGasLevel = (gasLevel) => {
//   isLow = gasLevel < gasThreshold
//   currentGas = gasLevel
// }

function Gas(show) {
  const { settings, setSettings } = useContext(SettingsContext);
  console.log('settings in gas', settings);
  console.log("TEST EQUALITY", settings['gasLow'] || false);

  let isLow = settings['gasLow'] || false;
  let currentGas = settings['gasLevel'] ?? 100;

  useEffect(() => {
    let newSettings = Object.assign({}, settings);
    newSettings['gasLow'] = isLow;
    newSettings['gasLevel'] = currentGas;
  
    setSettings(newSettings);

    storage.save({
      key: 'settings',
      data: newSettings,
    })
  }, []);

  // State to store gas value
  // const [gasLevel, setGas] = useState(100);

  // Function to increment gas percent by 1
  const incrementCount = () => {
    // Update state with incremented value
    if (currentGas < 100){
      // setGas(gasLevel + 1);
      // updateGasLevel(gasLevel);

      currentGas++;

      let newSettings = Object.assign({}, settings);
      newSettings['gasLow'] = currentGas < gasThreshold;
      newSettings['gasLevel'] = currentGas;
    
      setSettings(newSettings);

      storage.save({
        key: 'settings',
        data: newSettings,
      })
    }
  };
  // Function to decrement gas percent by 1
  const decrementCount = () => {
    if (currentGas > 0){
      // setGas(gasLevel - 1);
      // updateGasLevel(gasLevel);
      currentGas--;

      let newSettings = Object.assign({}, settings);
      newSettings['gasLow'] = currentGas < gasThreshold;
      newSettings['gasLevel'] = currentGas;
    
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

  return settings["GasMode"] == 2 && isLow || show ? (
    <View>    
      <FontAwesome5 name={"gas-pump"} size={42} color={settings['FontColor'] ? settings['FontColor'] : '#808080'} onPress={gasInfo}>
      <Text style={textStyle}> {currentGas}</Text>
      <Text style={subtextStyle}>%</Text>
      </FontAwesome5>
    </View>
  ) : settings["GasMode"] == 3 ? (
    <View>    
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
  ) : settings["GasMode"] == 4 ? (
    <View style={styles.gasContainer}>  
        <RNSpeedometer value={currentGas} size={100}/>
    </View>
  ) : <Text>This should not show up</Text>;
}

export default Gas;