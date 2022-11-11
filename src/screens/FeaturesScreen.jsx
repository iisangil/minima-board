import { useContext } from 'react';
import { View, Switch, Text, Button, SectionList, SafeAreaView, StatusBar, Platform, RefreshControl, TextInput } from 'react-native';
import { SettingsContext, storage } from '../context/settingsContext';

import { styles } from '../components/Styles';
import Icon from 'react-native-vector-icons/Entypo'
import PickerComponent from '../components/ColorPicker';
import {SettingsScreen, SettingsData, Chevron} from 'react-native-settings-screen';
import ColorPicker from 'react-native-wheel-color-picker';

import { changeRPMThreshold } from '../components/RPM';
import { changeSpeedThreshold } from '../components/Speed';

const FeaturesScreen = ({ navigation }) => {
  state = {
    refreshing: false,
  }
  const { settings, setSettings } = useContext(SettingsContext);

  const statusBarHeight = Platform.OS === 'ios' ? 35 : 0
  const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif'

  const renderHero = () => (
    <View style={styles.heroContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heroTitle}>Settings </Text>
      </View>
    </View>
  )

  const resetSettings = () => {
    let newSettings = Object.assign({}, settings);
    setSettings({});

    storage.save({
      key: 'settings',
      data: {}
    });

    alert("You have reset the app to default settings!");
    console.log("Reset Settings", newSettings);
  }

  const changeTheme = () => {
    // console.log('settings', settings);
    let newSettings = Object.assign({}, settings);
    newSettings["Theme"] = settings["Theme"] == "Light" ? "Dark" : "Light";
    setSettings(newSettings);
    // setSettings({});

    storage.save({
      key: 'settings',
      data: newSettings
      // data: {}
    });
  }

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

  let rpmThreshold = settings["RPMThreshold"]

  const handleRPM = (RPM) => {
    changeRPMThreshold(RPM)
    rpmThreshold = settings["RPMThreshold"]

    let newSettings = Object.assign({}, settings);
    newSettings["RPMThreshold"] = RPM
    setSettings(newSettings);
  
    storage.save({
      key: 'settings',
      data: newSettings
    });
  }

  let speedThreshold = settings["speedThreshold"]
  const handleSpeed = (speed) => {
    changeSpeedThreshold(speed)
    speedThreshold = settings["speedThreshold"]

    let newSettings = Object.assign({}, settings);
    newSettings["speedThreshold"] = speed
    setSettings(newSettings);
  
    storage.save({
      key: 'settings',
      data: newSettings
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8c231a" />

      <SettingsScreen
        data={[
          { type: 'CUSTOM_VIEW', key: 'hero', render: renderHero },

          {
            type: 'SECTION',
            header: 'Visual Settings'.toUpperCase(),
            rows: [
              {
                title: 'Preset Themes',
                subtitle: 'Preset Themes for Font and Background',
                renderAccessory:() => <Button title=">" onPress={() => navigation.navigate('PresetThemes')} />
              },
              {
                title: 'Application background',
                subtitle: 'Change application background color',
                renderAccessory:() => <Button title=">" onPress={() => navigation.navigate('ColorCustomization')} />
              },
              // {
              //   title: 'Speedometer Color',
              //   subtitle: 'Change speedometer color',
              //   renderAccessory:() => <Button title=">" onPress={() => navigation.navigate('SpeedColor')} />
              // },
              {
                title: 'Font and Alert Icon Color',
                subtitle: 'Change font and icon color',
                renderAccessory:() => <Button title=">" onPress={() => navigation.navigate('FontCustomization')} />
              },
 
            ],
          },

          {
            type: 'SECTION',
            header: 'Alert Settings'.toUpperCase(),
            footer:
              'Customize which alerts you would like to receive.',
            rows: [
              // {
              //   title: "Fuel Options",
              //   subtitle: 'Alert when gas is running low',
              //   renderAccessory:() => <Button
              //       title={gasMode}
              //       value={settings['Gas']}
              //       onPress={() => changeGasMode()}
              //     />
              // },
              {
                title: 'Fuel Display Options',
                subtitle: 'Different modes of display for the fuel',
                renderAccessory:() => <Button title=">" onPress={() => navigation.navigate('GasMode')} />
              },
              {
                title: 'RPM Alert',
                subtitle: 'Alert when RPM is exceedingly high',
                renderAccessory:() => <Switch
                    value={settings['RPM']}
                    onChange={() => selectFeature("RPM")}
                  />
              },
              {
                title: 'Seatbelt Alert',
                subtitle: 'Alert when seatbelts are not buckled',
                renderAccessory:() => <Switch
                    value={settings['Seatbelt']}
                    onChange={() => selectFeature("Seatbelt")}
                  />,
              }
              
            ],
          },
          
          
          {
            type: 'SECTION',
            header: 'Thresholds'.toUpperCase(),
            rows: [
              {
                title: 'Speed limit maximum',
                subtitle: 'Maximum Speed Limit',

                subtitle: 'Current: ' + speedThreshold,
                renderAccessory:() => <TextInput
                  style={styles.input}
                  onChangeText={handleSpeed}
                  placeholder="Maximum"
                  keyboardType="numeric"
                />
              },
              {
                title: 'RPM limit maximum',
                subtitle: 'Current: ' + rpmThreshold,
                renderAccessory:() => <TextInput
                  style={styles.input}
                  onChangeText={handleRPM}
                  placeholder="RPMs"
                  keyboardType="numeric"
                />
              },
            
            ],
          },
          {
            type: 'SECTION',
            header: 'Calling and Emergency'.toUpperCase(),
            rows: [
              {
                title: 'Enable Emergency calling',
                subtitle: 'Quick-call 911',
                renderAccessory:() => <Switch
                    value={settings['Emergency']}
                    onChange={() => selectFeature("Emergency")}
                  />
              }, 
              {
                title: 'Caller Selection',
                subtitle: 'Quick-call Up to 2 Contacts',
                renderAccessory: () => <Button title=">" onPress={() => navigation.navigate('Contacts')} />
              }
              
            ],
          },
          {
            type: 'SECTION',
            header: 'Display'.toUpperCase(),
            rows: [
              {
                title: 'Customize Display Layout',
                renderAccessory: () => <Button title=">" onPress={() => navigation.navigate('Layout')} />
              }, 
              {
                title: 'Reset Layout',
                renderAccessory: () => <Button title="Reset" onPress={() => resetSettings()} />
              }, 
            ],
          },
          

          {
            type: 'CUSTOM_VIEW',
            render: () => (
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  color: '#999',
                  marginBottom: 40,
                  marginTop: -30,
                  fontFamily,
                }}
              >
                v1.0.0
              </Text>
            ),
          },
        ]}
        globalTextStyle={{ fontFamily }}
        // scrollViewProps={{}}
        
      />

    
    </View>

    
  )
  

}

export default FeaturesScreen;