import { useContext, useState } from 'react';
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

const ApplicationScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  const { width, height } = Dimensions.get('window')

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
    console.log('HEREHRKJEREH', item, settings[item], settings)
    console.log('data state', dataState);
    if (settings['contacts'] && item == 'contact1' || item == 'contact2') {

      if (item == 'contact1') {
        let contactName = [...settings['contacts']].sort()[0];
        let phoneNumber = settings['numbers'][contactName];

        let contact = { contactName, phoneNumber }
        return (
          <View style={{
            width: width / 3, height: height / 5.5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
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
            width: width / 3, height: height / 5.5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          }}>
            <Contact contact={contact} />
          </View>
        )
      }
    }
    else if (settings[item] || item == 'Button' || item == 'Speed') {
      return (
        <View style={{
          width: width / 3, height: height / 5.5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        }}>
          {components[item]}
        </View>
      )
    }
  }



  return (
    
    <View>
      <DragSortableView
      dataSource={dataState}
      parentWidth={width}
      childrenWidth={width / 3}
      marginChildrenBottom={0.03409090909 * height / 2}
      marginChildrenRight={0.08333333333 * width}
      marginChildrenLeft = {0.08333333333 * width}
      marginChildrenTop = {0.03409090909 * height / 2}
      parentHeight={height}
      childrenHeight={height / 5.5}
      onDataChange = {(data)=>{
        if (data.length != dataState.length) {
          setData(data);
        }
      }}
      renderItem={renderComponent}
      keyExtractor={item => item}
      itemsPerRow={2}
      dragActivationTreshold={300}
    />
    </View>
  )


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Emergency />
      <Gas/>
      <RPM/>
      <Seatbelt/>
      <TirePressure />

    </View>
  )
}

export default ApplicationScreen;