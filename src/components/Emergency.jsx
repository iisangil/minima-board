import { useContext } from 'react';
import { Linking, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { SettingsContext } from '../context/settingsContext';
import { styles } from './Styles';

export const Emergency = () => {
  const { settings } = useContext(SettingsContext);

  const callEmergency = () => {
    Linking.openURL('tel:911');
  }

  let contactStyle = Object.assign({}, styles.contact);
  contactStyle['borderColor'] = settings['Theme'] == 'Light' ? 'black' : 'white';
  let color = settings['Theme'] == 'Light' ? 'black' : 'white';

  return (
    <View style={contactStyle} onPress={callEmergency}>
      <Text style={{ fontSize: '28', color: color, }} >911</Text>
    </View>
  )
}

export const Contact = (number) => {
  const { settings } = useContext(SettingsContext);

  const callContact = () => {
    LInking.openURL(`tel:${number}`);
  }

  let contactStyle = Object.assign({}, styles.contact);
  contactStyle['borderColor'] = settings['Theme'] == 'Light' ? 'black' : 'white';
  let color = settings['Theme'] == 'Light' ? 'black' : 'white';

  return (
    <View style={contactStyle} onPress={callContact}>
      <Text style={{ fontSize: '28', color: color, }}>ZZ</Text>
    </View>
  )
}