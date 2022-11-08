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
    <View style={contactStyle}>
      <Text style={{ fontSize: '28', color: color, }} onPress={callEmergency}>911</Text>
    </View>
  )
}

export const Contact = (contact) => {
  console.log("CONTACT RENDERING", contact);
  const { settings } = useContext(SettingsContext);

  const callContact = () => {
    Linking.openURL(`tel:${contact.contact.phoneNumber}`);
  }

  let contactStyle = Object.assign({}, styles.contact);
  contactStyle['borderColor'] = settings['Theme'] == 'Light' ? 'black' : 'white';
  let color = settings['Theme'] == 'Light' ? 'black' : 'white';

  const contactName = () => {
    console.log('function', contact, 'contact', contact.contact, 'name', contact.contact.contactName);
    let names = contact.contact.contactName.toUpperCase().split(' ');
    let initials = names[0][0] + names[names.length - 1][0];
    console.log("INITIALS OF", contact.contact.contactName, names, initials);
    return initials;
  }

  return (
    <View style={contactStyle}>
      <Text style={{ fontSize: '28', color: color, }} onPress={callContact}>{contactName()}</Text>
    </View>
  )
}