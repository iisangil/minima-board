import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectList from 'react-native-dropdown-select-list'
import { SettingsContext, storage } from '../context/settingsContext';

import {styles} from '../components/Styles.js';

export function GasCustomizationScreen({navigation}){
  const { settings, setSettings } = useContext(SettingsContext);
  const [selected, setSelected] = React.useState("");

  const components = {
    'Emergency': <Emergency />,
    'Gas': <Gas />,
    'RPM': <RPM />,
    'Seatbelt': <Seatbelt />,
    'Button': <Button
              title="Back to Home"
              onPress={() => navigation.navigate("Home")}
              />,
    'Speed': <SpeedDisplay />,
  };

  const selectFeature = (feature) => {
    let newSettings = Object.assign({}, settings);
    newSettings[feature] = !newSettings[feature]; 
    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);

    storage.save({
      key: 'settings',
      data: newSettings
    });
  } 
  
  const data = [{key:'1',value:'Hidden'},
  {key:'2',value:'Alert'},
  {key:'3',value:'Percentage'},
  {key:'4',value:'Gauge'},];
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       {/* <SelectList setSelected={setSelected} data={data} onSelect={() => alert(selected)} /> */}
       <SelectList setSelected={setSelected} data={data}/>


        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

export default GasCustomizationScreen;