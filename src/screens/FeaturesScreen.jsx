import { useContext } from 'react';
import { View, Switch, Text, Button, SectionList, SafeAreaView, StatusBar, Platform, RefreshControl } from 'react-native';
import { SettingsContext } from '../context/settingsContext';

import { styles } from '../components/Styles';
import Icon from 'react-native-vector-icons/Entypo'
import {SettingsScreen, SettingsData, Chevron} from 'react-native-settings-screen';

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
        <Text style={styles.heroTitle}>Current User</Text>
      </View>
      <Chevron />
    </View>
  )

  const selectFeature = (feature) => {
    let newSettings = Object.assign({}, settings);
    newSettings[feature] = !newSettings[feature]; 
    setSettings(newSettings);
    console.log("NEWSETTINGS", newSettings);
  } 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8c231a" />

      <SettingsScreen
        data={[
          { type: 'CUSTOM_VIEW', key: 'hero', render: renderHero },
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
                title: 'Caller Whitelist',
                subtitle: 'Block certain callers',
                renderAccessory:() => <Switch
                    value={settings['Emergency']}
                    onChange={() => selectFeature("Emergency")}
                  />
              }
              
            ],
          },
          
          {
            type: 'SECTION',
            header: 'Color Customization'.toUpperCase(),
            rows: [

              {
                title: 'Background Color',
                renderAccessory: () => (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: 'blue',
                    }}
                  />
                ),
                showDisclosureIndicator: true,
              }
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
      <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
        <Text style ={styles.headerText}>Seatbelt Alert</Text>
        <Switch
          value={settings['Seatbelt']}
          onChange={() => selectFeature("Seatbelt")}
        />
      </View>

    </View>
  )
  

}

export default FeaturesScreen;