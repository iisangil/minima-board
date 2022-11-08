import { useContext } from 'react';
import { View, Switch, Text, Button, SectionList, SafeAreaView, StatusBar, Platform, RefreshControl } from 'react-native';
import { SettingsContext, storage } from '../context/settingsContext';

import { styles } from '../components/Styles';
import Icon from 'react-native-vector-icons/Entypo'
import PickerComponent from '../components/ColorPicker';
import {SettingsScreen, SettingsData, Chevron} from 'react-native-settings-screen';
import ColorPicker from 'react-native-wheel-color-picker';

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
                title: 'Dark Mode',
                renderAccessory:() => <Switch
                    value={settings['Theme'] != 'Light'}
                    onChange={() => changeTheme("Theme")}
                  />
                
                // <Button title="Switch Theme" onPress={changeTheme} />
              },
              {
                title: 'Customize Colors',
                subtitle: 'Colors for alerts, backgrounds',
                renderAccessory:() => <Button title=">" onPress={() => navigation.navigate('ColorCustomization')} />
              },
 
            ],
          },

          {
            type: 'SECTION',
            header: 'Alert Settings'.toUpperCase(),
            footer:
              'Customize which alerts you would like to receive.',
            rows: [
              {
                title: 'Fuel Alert',
                subtitle: 'Alert when gas is running low',
                renderAccessory:() => <Switch
                    value={settings['Gas']}
                    onChange={() => selectFeature("Gas")}
                  />
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
                  />
              }
              // {
              //   title: 'Text',
              //   renderAccessory: () => (
              //     <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              //       Maybe
              //     </Text>
              //   ),
              // },
              
            ],
          },
          
          
          {
            type: 'SECTION',
            header: 'Thresholds'.toUpperCase(),
            rows: [
              {
                title: 'Speed limit threshold',
                subtitle: 'Min and max over and below speed limits',
                showDisclosureIndicator: true,
              },
              {
                title: 'RPM limit threshold',
                subtitle: 'Highest RPM limits',
                showDisclosureIndicator: true,
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