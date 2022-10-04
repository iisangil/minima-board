import { useContext } from 'react';
import { View, Switch, Text, Button } from 'react-native';
import { SettingsContext } from '../context/settingsContext';

import { styles } from '../components/Styles';

const FeaturesScreen = ({ navigation }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  
  const selectFeature = (feature) => {
    let newSettings = Object.assign({}, settings);
    newSettings["Emergency"] = !newSettings["Emergency"]; 
    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);
  } 


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={styles.text}>Select Features</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Emergency Calling     </Text>
        <Switch
        value={settings['Emergency']}
        onChange={selectFeature}
        />
      </View>
      <Button title='Back to Home' onPress={() => navigation.navigate('Home')} />
    </View>
  )
}

export default FeaturesScreen;