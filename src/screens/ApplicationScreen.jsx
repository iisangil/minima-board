import { useContext, useState } from 'react';
import { View, Button, Dimensions } from 'react-native';
import { DragSortableView } from 'react-native-drag-sort';
import Emergency from '../components/Emergency';
import Gas from '../components/Gas';
import RPM from '../components/RPM';
import Seatbelt from '../components/Seatbelt.jsx';
import TirePressure from '../components/TirePressure';
import { SettingsContext } from '../context/settingsContext';
import SpeedDisplay from '../components/Speed';

const ApplicationScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  const { width, height } = Dimensions.get('window')

  const components = {
    'Emergency': <Emergency />,
    'GasMode': <Gas />,
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
    'GasMode',
    'RPM',
    'Seatbelt',
    'Button',
    'Speed'
  ];

  const [ dataState, setData ] = useState(dataArray);

  const renderComponent = (item, index) => {
    console.log(item, settings[item]);
    console.log('data state', dataState);
    if (settings[item] || item == 'Button' || item == 'Speed' || (item == 'GasMode' && settings[item] != 1)) {
      return (
        <View style={{
          width: width / 3, height: height / 3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
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
      marginChildrenBottom={10}
      marginChildrenRight={10}
      marginChildrenLeft = {10}
      marginChildrenTop = {10}
      childrenHeight={height / 6}
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