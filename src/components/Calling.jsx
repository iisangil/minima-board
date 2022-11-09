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
  contactStyle['borderColor'] = settings["FontColor"];

  return (
    <View style={contactStyle}>
      <Text style={{ fontSize: '28', color: settings["FontColor"], }} onPress={callEmergency}>911</Text>
    </View>
  )
}

export const Contact = (contact) => {
  const { settings } = useContext(SettingsContext);

  const callContact = () => {
    Linking.openURL(`tel:${contact.contact.phoneNumber}`);
  }

  let contactStyle = Object.assign({}, styles.contact);
  contactStyle['borderColor'] = settings["FontColor"];

  const contactName = () => {
    let names = contact.contact.contactName.toUpperCase().split(' ');
    let initials = names[0][0] + names[names.length - 1][0];
    return initials;
  }

  return (
    <View style={contactStyle}>
      <Text style={{ fontSize: '28', color: settings["FontColor"], }} onPress={callContact}>{contactName()}</Text>
    </View>
  )
}