import { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, View, Button, TouchableOpacity } from 'react-native';
import { SettingsContext, storage } from "../context/settingsContext";
import { Emergency, Contact } from '../components/Calling';
import Gas from '../components/Gas';
import RPM from '../components/RPM';
import Seatbelt from '../components/Seatbelt.jsx';
import TirePressure from '../components/TirePressure';
import SpeedDisplay from '../components/Speed';
import * as ScreenOrientation from 'expo-screen-orientation';
import { DragSortableView, AnySizeDragSortableView } from 'react-native-drag-sort';

const LayoutScreen = ({ navigation }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { width, height } = Dimensions.get('window');
  console.log('width height', width, height)

  const [orientation, setOrientation] = useState(1);
  const refContainer = useRef();

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
                color={settings['FontColor']}
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

    const renderComponent = (item, index) => {
      if (item == 'Speed') {
        return (
          <View
          style={{
          width: (width < height ? width / 3 : width / 5.5) * 2,
          height: width < height ? height / 5.5 : height / 3,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'solid',
          borderWidth: '1px',
          borderRadius: '35',
          marginLeft: (width < height ? 0.08333333333 * width : 0.03409090909 * width / 2) * 2,
          marginRight: (width < height ? 0.08333333333 * width : 0.03409090909 * width / 2) * 2,
          marginTop: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height,
          marginBottom: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height
          }}>
            {components[item]}
          </View>
        )
      }
      else if (item == 'contact1' || item == 'contact2') {
        if (!settings['contacts'] || settings['contacts'].length == 0) {
          return;
        }
        if (item == 'contact1') {
          let contactId = [...settings['contacts']].sort()[0];

          let { contactName, phoneNumber } = settings['info'][contactId];
          return (
            <TouchableOpacity
            onLongPress={() => refContainer.current.startTouch(item, index)}
            onPressOut={() => refContainer.current.onPressOut()}
            style={{
              width: width < height ? width / 3 : width / 5.5,
              height: width < height ? height / 5.5 : height / 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'solid',
              borderWidth: '1px',
              borderRadius: '35',
              marginLeft: width < height ? 0.08333333333 * width : 0.03409090909 * width / 2,
              marginRight: width < height ? 0.08333333333 * width : 0.03409090909 * width / 2,
              marginTop: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height,
              marginBottom: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height
            }}>
              <View>
                <Contact contact={{ contactName, phoneNumber }} />
              </View>
            </TouchableOpacity>
          )
        }
        else if (settings['contacts'].length > 1) {
          let contactId = [...settings['contacts']].sort()[1];

          let { contactName, phoneNumber } = settings['info'][contactId];
          return (
            <TouchableOpacity
            onLongPress={() => refContainer.current.startTouch(item, index)}
            onPressOut={() => refContainer.current.onPressOut()}
            style={{
              width: width < height ? width / 3 : width / 5.5,
              height: width < height ? height / 5.5 : height / 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'solid',
              borderWidth: '1px',
              borderRadius: '35',
              marginLeft: width < height ? 0.08333333333 * width : 0.03409090909 * width / 2,
              marginRight: width < height ? 0.08333333333 * width : 0.03409090909 * width / 2,
              marginTop: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height,
              marginBottom: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height
            }}>
              <View>
                <Contact contact={{ contactName, phoneNumber }} />
              </View>
            </TouchableOpacity>
          )
        }
      }
      else if (item == 'GasMode') {
        if (settings[item] != null && settings[item] != 1) {
          return (
            <TouchableOpacity
            onLongPress={() => refContainer.current.startTouch(item, index)}
            onPressOut={() => refContainer.current.onPressOut()}
            style={{
            width: (width < height ? width / 3 : width / 5.5),
            height: width < height ? height / 5.5 : height / 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'solid',
            borderWidth: '1px',
            borderRadius: '35',
            marginLeft: (width < height ? 0.08333333333 * width : 0.03409090909 * width / 2),
            marginRight: (width < height ? 0.08333333333 * width : 0.03409090909 * width / 2),
            marginTop: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height,
            marginBottom: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height
            }}>
              {components[item]}
            </TouchableOpacity>
          )
        }
      }
      else if (settings[item] || item == 'Button') {
        return (
          <TouchableOpacity
          onLongPress={() => refContainer.current.startTouch(item, index)}
          onPressOut={() => refContainer.current.onPressOut()}
          style={{
          width: (width < height ? width / 3 : width / 5.5),
          height: width < height ? height / 5.5 : height / 3,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'solid',
          borderWidth: '1px',
          borderRadius: '35',
          marginLeft: (width < height ? 0.08333333333 * width : 0.03409090909 * width / 2),
          marginRight: (width < height ? 0.08333333333 * width : 0.03409090909 * width / 2),
          marginTop: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height,
          marginBottom: width < height ? 0.03409090909 * height / 2 : 0.08333333333 * height
          }}>
            {components[item]}
          </TouchableOpacity>
        )
      }
    }
  
    return (
      
      <View style={{ backgroundColor: settings["Background"], width: width, height: height }}>
          <AnySizeDragSortableView
          ref={refContainer}
          dataSource={dataState}
          renderItem={renderComponent}
          keyExtractor={item => item}
          onDataChange = {(data, callback) => {
            console.log('DATHALKSHAKJHDKAJHDKL', data, callback);
            setData([...data]);
  
            let newSettings = Object.assign({}, settings);
            newSettings['layout'] = [...data];
            setSettings(newSettings);
            console.log('new settings', newSettings);
            
            storage.save({
              key: 'settings',
              data: newSettings
            });
            callback();
          }}
        />
      </View>
    )
  
  }
  
  export default LayoutScreen;