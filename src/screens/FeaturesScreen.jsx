import { useContext } from 'react';
import { View, Switch, Text, Button, SectionList, SafeAreaView, StatusBar } from 'react-native';
import { SettingsContext } from '../context/settingsContext';

import { styles } from '../components/Styles';


const FeaturesScreen = ({ navigation }) => {

  const { settings, setSettings } = useContext(SettingsContext);

  const selectEmergency = (feature) => {
    let newSettings = Object.assign({}, settings);
    newSettings["Emergency"] = !newSettings["Emergency"]; 
    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);
  } 
  
  const selectGas = (feature) => {
    let newSettings = Object.assign({}, settings);
    newSettings["Gas"] = !newSettings["Gas"]; 
    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);
  
  } 

  const selectRPM = (feature) => {
    let newSettings = Object.assign({}, settings);
    newSettings["RPM"] = !newSettings["RPM"]; 
    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);
  
  } 

  const selectSeatbelt = (feature) => {
    let newSettings = Object.assign({}, settings);
    newSettings["Seatbelt"] = !newSettings["Seatbelt"]; 
    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);
  
  } 

  return (
    <View style={{ flex: 1, backgroundColor: "#ffeec2" }}>
      <Text style={styles.text}>Select Features</Text>


      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style ={styles.headerText}>Emergency Calling</Text>
        <Switch
        value={settings['Emergency']}
        onChange={selectEmergency}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style ={styles.headerText}>Gas Alert                    </Text>
        <Switch
        value={settings['Gas']}
        onChange={selectGas}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style ={styles.headerText}>RPM Alert                   </Text>
        <Switch
        value={settings['RPM']}
        onChange={selectRPM}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style ={styles.headerText}>Seatbelt Alert           </Text>
        <Switch
        value={settings['Seatbelt']}
        onChange={selectSeatbelt}
        />
      </View>

      <View style = {styles.button}>
        <Button title='Back to Home' onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  )
}

export default FeaturesScreen;