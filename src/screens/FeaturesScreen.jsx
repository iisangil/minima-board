import { useContext } from 'react';
import { View, Switch, Text, Button, SectionList, SafeAreaView, StatusBar } from 'react-native';
import { SettingsContext } from '../context/settingsContext';

import { styles } from '../components/Styles';


const FeaturesScreen = ({ navigation }) => {

  const { settings, setSettings } = useContext(SettingsContext);

  const selectFeature = (feature) => {
    let newSettings = Object.assign({}, settings);
    newSettings[feature] = !newSettings[feature]; 
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
          onChange={selectFeature}
          onChange={() => selectFeature("Emergency")}
        />
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
        <Text style ={styles.headerText}>Gas Alert                    </Text>
        <Switch
          value={settings['Gas']}
          onChange={selectFeature}
          onChange={() => selectFeature("Gas")}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <Text style ={styles.headerText}>RPM Alert                  </Text>
        <Switch
          value={settings['RPM']}
          onChange={selectFeature}
          onChange={() => selectFeature("RPM")}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
        <Text style ={styles.headerText}>Seatbelt Alert          </Text>
        <Switch
          value={settings['Seatbelt']}
          onChange={selectFeature}
          onChange={() => selectFeature("Seatbelt")}
        />
      </View>

      
      <View style = {styles.button}>
        <Button title='Back to Home' onPress={() => navigation.navigate('Home')} />
      </View>
      
    </View>
  )
}

export default FeaturesScreen;