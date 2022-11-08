import { useContext, useState, useEffect } from 'react';
import { View, Button, Dimensions, Platform } from 'react-native';
import { DragSortableView } from 'react-native-drag-sort';
import { Emergency, Contact } from '../components/Calling';
import Gas from '../components/Gas';
import RPM from '../components/RPM';
import Seatbelt from '../components/Seatbelt.jsx';
import TirePressure from '../components/TirePressure';
import { SettingsContext } from '../context/settingsContext';
import SpeedDisplay from '../components/Speed';
import ColorPicker from 'react-native-wheel-color-picker';
import { styles } from '../components/Styles';
import * as ScreenOrientation from 'expo-screen-orientation';

const ApplicationScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  const { width, height } = Dimensions.get('window');
  console.log("WDIHT HEIGHT", width, height);

  const [ dataState, setData ] = useState(settings['layout']);

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

  const dataArray = [
    'Emergency',
    'Gas',
    'RPM',
    'Seatbelt',
    'Button',
    'Speed',
    'contact1',
    'contact2',
  ];

  const renderComponent = (item, index) => {
    console.log("settings render", settings);
    if (item == 'contact1' || item == 'contact2') {
      if (!settings['contacts'] || settings['contacts'].length == 0) {
        return;
      }
      else if (item == 'contact1') {
        let contactName = [...settings['contacts']].sort()[0];
        let phoneNumber = settings['numbers'][contactName];

        let contact = { contactName, phoneNumber }
        return (
          <View style={{
            width: width < height ? width / 3 : width / 5.5,
            height: width < height ? height / 5.5 : height / 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'solid',
            borderWidth: '1px',
            borderRadius: '35'
          }}>
            <Contact contact={contact} />
          </View>
        )
      }
      else if (settings['contacts'].length > 1) {
        let contactName = [...settings['contacts']].sort()[1];
        let phoneNumber = settings['numbers'][contactName];

        let contact = { contactName, phoneNumber }
        return (
          <View style={{
            width: width < height ? width / 3 : width / 5.5,
            height: width < height ? height / 5.5 : height / 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'solid',
            borderWidth: '1px',
            borderRadius: '35'
          }}>
            <Contact contact={contact} />
          </View>
        )
      }
    }
    else if (settings[item] || item == 'Button' || item == 'Speed') {
      return (
        <View style={{
          width: width < height ? width / 3 : width / 5.5,
          height: width < height ? height / 5.5 : height / 3,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'solid',
          borderWidth: '1px',
          borderRadius: '35'
        }}>
          {components[item]}
        </View>
      )
    }
  }

  return (
    
    <View style={{ backgroundColor: settings["Background"] }}>
      

      <DragSortableView
      dataSource={dataState}
      parentWidth={width}
      childrenWidth={width < height ? width / 3 : width / 5.5}
      marginChildrenBottom={width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height}
      marginChildrenRight={width < height ? 0.08333333333 * width : 0.03409090909 * width / 2}
      marginChildrenLeft = {width < height ? 0.08333333333 * width : 0.03409090909 * width / 2}
      marginChildrenTop = {width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height}
      parentHeight={height}
      childrenHeight={width < height ? height / 5.5 : height / 3}
      renderItem={renderComponent}
      keyExtractor={item => item}
      dragActivationTreshold={300}
      sortable={false}
    />
    </View>
  )

}

export default ApplicationScreen;