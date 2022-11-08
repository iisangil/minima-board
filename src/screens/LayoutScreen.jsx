import { useState, useEffect, useContext } from 'react';
import { Dimensions, View, Button } from 'react-native';
import { SettingsContext, storage } from "../context/settingsContext";
import { Emergency, Contact } from '../components/Calling';
import Gas from '../components/Gas';
import RPM from '../components/RPM';
import Seatbelt from '../components/Seatbelt.jsx';
import TirePressure from '../components/TirePressure';
import SpeedDisplay from '../components/Speed';
import * as ScreenOrientation from 'expo-screen-orientation';
import { DragSortableView } from 'react-native-drag-sort';

const LayoutScreen = ({ navigation }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { width, height } = Dimensions.get('window');

  const [orientation, setOrientation] = useState(1);

  useEffect(() => {
    const unlockScreen = async () => {
      await ScreenOrientation.unlockAsync();
    }

    unlockScreen();
  }, []);

  useEffect(( )=> {
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
      console.log('datasate', dataState);
      let newSettings = Object.assign({}, settings);
      newSettings['layout'] = dataState;
      setSettings(newSettings);
      console.log('new settings', newSettings);

      storage.save({
        key: 'layout',
        data: newSettings
      });
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

    const [ dataState, setData ] = useState(dataArray);

    const renderComponent = (item, index) => {
      if (item == 'contact1' || item == 'contact2') {
        if (!settings['contacts'] || settings['contacts'].length == 0) {
          return;
        }
        if (item == 'contact1') {
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

    // const layoutHandler = (data) => {

    // }
  
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
        onDataChange = {(data, callback) => {
          console.log('DATHALKSHAKJHDKAJHDKL', data);
          setData(data);
        }}
        renderItem={renderComponent}
        keyExtractor={item => item}
        dragActivationTreshold={300}
      />
      </View>
    )
  
  }
  
  export default LayoutScreen;