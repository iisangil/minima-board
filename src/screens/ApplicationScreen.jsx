import { useContext, useState, useEffect, useRef } from 'react';
import { View, Button, Dimensions, Text } from 'react-native';
import { AnySizeDragSortableView } from 'react-native-drag-sort';
import { Emergency, Contact } from '../components/Calling';
import Gas from '../components/Gas';
import RPM from '../components/RPM';
import Seatbelt from '../components/Seatbelt.jsx';
import TirePressure from '../components/TirePressure';
import { SettingsContext } from '../context/settingsContext';
import SpeedDisplay from '../components/Speed';
import { styles } from '../components/Styles';
import * as ScreenOrientation from 'expo-screen-orientation';

const ApplicationScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  const { width, height } = Dimensions.get('window');
  console.log("WDIHT HEIGHT", width, height);

  const [orientation, setOrientation] = useState(1);
  
  useEffect(() => {
    const unlockScreen = async () => {
      await ScreenOrientation.unlockAsync();
    }
    
    unlockScreen();
  }, []);

  useEffect(() => {
    const lockScreen = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
    
    // set initial orientation
    ScreenOrientation.getOrientationAsync()
    .then((info) =>{
      setOrientation(info.orientation);
    });
    
    // subscribe to future changes
    const subscription = ScreenOrientation.addOrientationChangeListener((evt)=>{
      setOrientation(evt.orientationInfo.orientation);
      console.log('oreitnaiton change', evt.orientationInfo.orientation)
    });
    
    // return a clean up function to unsubscribe from notifications
    return ()=>{
      lockScreen();
      ScreenOrientation.removeOrientationChangeListener(subscription);
    }
    }, []);

    const components = {
    'Speed': <SpeedDisplay />,
    'Emergency': <Emergency />,
    'GasMode': <Gas />,
    'RPM': <RPM />,
    'Seatbelt': <Seatbelt />,
    'Button': <Button
              title="Back to Home"
              onPress={() => navigation.navigate("Home")}
              color={settings["FontColor"]}
              />,
  };
  
  const dataArray = [
    'Speed',
    'Emergency',
    'GasMode',
    'RPM',
    'Seatbelt',
    'Button',
    'contact1',
    'contact2',
  ];

  const [ dataState, setData ] = useState(settings['layout'] ? settings['layout'] : dataArray);
  console.log("DATASTATE", dataState);
  console.log("settings render", settings);
  
  const renderComponent = (item, index) => {
    console.log('iTEM', item);
    if (item == 'Speed') {
      return;
    }  
    else if (item == 'contact1' || item == 'contact2') {
      if (!settings['contacts'] || settings['contacts'].length == 0) {
        return;
      }
      if (item == 'contact1') {
        let contactId = [...settings['contacts']].sort()[0];

        let { contactName, phoneNumber } = settings['info'][contactId];
        return (
          <View
          style={{
            width: width < height ? width / 3.5 : height / 4,
            height: width < height ? width / 3.5 : height / 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'solid',
            borderWidth: '1px',
            borderRadius: '35',
            marginLeft: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
            marginRight: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
            marginTop: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
            marginBottom: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          }}>
            <Contact contact={{ contactName, phoneNumber }} />
          </View>
        )
      }
      else if (settings['contacts'].length > 1) {
        let contactId = [...settings['contacts']].sort()[1];

        let { contactName, phoneNumber } = settings['info'][contactId];
        return (
          <View
          style={{
            width: width < height ? width / 3.5 : height / 4,
            height: width < height ? width / 3.5 : height / 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'solid',
            borderWidth: '1px',
            borderRadius: '35',
            marginLeft: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
            marginRight: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
            marginTop: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
            marginBottom: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          }}>
            <Contact contact={{ contactName, phoneNumber }} />
          </View>
        )
      }
    }
    else if (item == 'GasMode') {
      console.log("TEST", settings[item] != 1);
      if (settings[item] != null && settings[item] != 1) {
        console.log('here');
        return settings['gasLow'] ? (
          <View
          style={{
          width: width < height ? width / 3.5 : height / 4,
          height: width < height ? width / 3.5 : height / 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'solid',
          borderWidth: '1px',
          borderRadius: '35',
          marginLeft: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
          marginRight: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
          marginTop: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          marginBottom: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          }}>
            <Gas show={false} />
          </View>
        ) : (
          <View
          style={{
          width: width < height ? width / 3.5 : height / 4,
          height: width < height ? width / 3.5 : height / 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
          marginRight: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
          marginTop: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          marginBottom: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          }}>
          </View>
        )
      }
      return;
    } 
    else if (item == 'RPM') {
      if (settings[item]) {
        return settings['rpmHigh'] ? (
          <View
          style={{
          width: width < height ? width / 3.5 : height / 4,
          height: width < height ? width / 3.5 : height / 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'solid',
          borderWidth: '1px',
          borderRadius: '35',
          marginLeft: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
          marginRight: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
          marginTop: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          marginBottom: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          }}>
            <RPM />
          </View>
        ) : (
          <View
          style={{
          width: width < height ? width / 3.5 : height / 4,
          height: width < height ? width / 3.5 : height / 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
          marginRight: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
          marginTop: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          marginBottom: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
          }}>
          </View>
        )
      }
      return;
    } 
    else if (settings[item] || item == 'Button') {
      console.log("ITEM", item, settings[item]);
      return (
        <View
        style={{
        width: width < height ? width / 3.5 : height / 4,
        height: width < height ? width / 3.5 : height / 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid',
        borderWidth: '1px',
        borderRadius: '35',
        marginLeft: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
        marginRight: width < height ? 0.0238095238 * width : 0.0238095238 * height * 2,
        marginTop: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
        marginBottom: width < height ? 0.03409090909 * height / 4 : 0.03409090909 * width / 3.7,
        }}>
          {components[item]}
        </View>
      )
    }
  }

  const refContainer = useRef();
  console.log("ORIENTATION", orientation);
  return (
    
    <View style={{
    color: settings["FontColor"],
    backgroundColor: settings["Background"],
    width: width,
    height: height,
    flex: '1',
    flexDirection: orientation && orientation != 1 ? 'row' : 'column',
    }}>
      <View
      style={{
      width: (width < height ? width / 2.25 : width / 5) * 2,
      height: (width < height ? width / 2.5 : height / 2.3) * 2,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '35',
      marginLeft: (width < height ? 0.02777777777 * width : 0.05 * width / 2) * 2,
      marginRight: (width < height ? 0.02777777777 * width : 0.01 * width / 2) * 2,
      marginTop: width < height ? 0.03409090909 * height / 2 : 0.02608695652 * height,
      marginBottom: width < height ? 0.03409090909 * height / 2 : 0.03260869565 * height
      }}>
        <SpeedDisplay />
      </View>
      <AnySizeDragSortableView
      ref={refContainer}
      dataSource={dataState}
      renderItem={renderComponent}
      keyExtractor={item => item}
      sortable={false}
    />
  </View>
  )

}

export default ApplicationScreen;