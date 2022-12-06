import { useContext, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { SettingsContext, storage } from '../context/settingsContext';
import { updateTirePressure } from '../components/TirePressure';
import { updateSeatbelt } from '../components/Seatbelt';
import { gasThreshold } from '../components/Gas';
import { rpmThreshold } from '../components/RPM';
import { styles } from '../components/Styles';
import { updateSpeed } from '../components/Speed';

const DeveloperScreen = ({ navigation }) => {
  const { settings, setSettings } = useContext(SettingsContext);

  let isLow = settings['gasLow'] || false;
  let currentGas = settings['gasLevel'] ? settings['gasLevel'] : 100;

  useEffect(() => {
    let newSettings = Object.assign({}, settings);
    newSettings['gasLow'] = isLow;
    newSettings['gasLevel'] = currentGas;

    if (!newSettings['RPMThreshold']) {
      newSettings['RPMThreshold'] = 2000;
    }
  
    setSettings(newSettings);

    storage.save({
      key: 'settings',
      data: newSettings,
    })
  }, []);

  const handleTirePressure = (pressure) => {
    updateTirePressure(pressure)
  }
  const handleGasLevel = (gas) => {
    currentGas = gas;

    let newSettings = Object.assign({}, settings);
    newSettings['gasLow'] = currentGas < gasThreshold;
    newSettings['gasLevel'] = currentGas;
  
    setSettings(newSettings);

    storage.save({
      key: 'settings',
      data: newSettings,
    })

    console.log("NEW SETTINGS DEV", newSettings);
  }
  const handleRPM = (rpm) => {
    console.log("RPM", rpm, settings, rpmThreshold);
    currentRPM = rpm;

    let newSettings = Object.assign({}, settings);
    newSettings['rpmHigh'] = currentRPM > rpmThreshold;
    newSettings['rpmLevel'] = currentRPM;

    setSettings(newSettings);

    storage.save({
      key: 'settings',
      data: newSettings,
    });
  }
  const handleSeatbelt = (isOn) => {
    console.log("Seatbelt on: ", isSeatbeltOn)
    updateSeatbelt(isSeatbeltOn)
  }
  const handleSpeed = (speed) =>{
    updateSpeed(speed)
  }

  // Sets all values to numbers that would set off alerts and goes to the app
  const turnOnAllAlerts = () => {
    updateTirePressure(25)

    let newSettings = Object.assign({}, settings);
    newSettings['gasLow'] = true;
    newSettings['gasLevel'] = 20;
    
    newSettings['rpmHigh'] = true;
    newSettings['rpmLevel'] = 3000;

    setSettings(newSettings);

    storage.save({
      key: 'settings',
      data: newSettings,
    });

    updateSeatbelt(false)
    // updateSpeed(100)
    navigation.navigate('Application')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={styles.text}></Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                style={styles.input}
                onChangeText={handleTirePressure}
                placeholder="Tire Pressure"
                keyboardType="numeric"
            />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                style={styles.input}
                onChangeText={handleGasLevel}
                placeholder="Gas Level %"
                keyboardType="numeric"
            />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                style={styles.input}
                onChangeText={handleRPM}
                placeholder="RPMs"
                keyboardType="numeric"
            />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                style={styles.input}
                onChangeText={handleSpeed}
                placeholder="Speed"
                keyboardType="numeric"
            />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
            title="Seatbelt On"
            onPress={() => handleSeatbelt(true)}
            />
            <Button
            title="Seatbelt Off"
            onPress={() => handleSeatbelt(false)}
            />
        </View>
      <Button title='Go To Dashboard' onPress={() => navigation.navigate("Application")} />
      <Button title='Turn on All Alerts' onPress={turnOnAllAlerts}/>
      <Button title='Back to Home' onPress={() => navigation.navigate("Home")} />
    </View>
  )
}

export default DeveloperScreen;