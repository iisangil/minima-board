import { useEffect, useState, useContext } from 'react';
import { View, Text, StatusBar, Switch } from 'react-native';
import { SettingsContext, storage } from '../context/settingsContext';
import * as Contacts from 'expo-contacts';
import { SettingsScreen } from 'react-native-settings-screen';
import { styles } from '../components/Styles';

const ContactsScreen = (navigation) => {
  const [contactInfo, setContacts] = useState([]);

  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          // console.log('DATA', data);
          setContacts(data);
        }
      }
    })();
  }, []);

  const selectContact = (contact) => {
    console.log("SELECTING", contact, settings);
    let contactName = contact.name;
    let phoneNumber = contact.phoneNumbers[0].number;
    let contactId = contact.id;

    let selectedContacts;
    if (!settings['contacts']) {
      selectedContacts = [contactId];
    } 
    else if (settings['contacts'].includes(contactId)) {
      console.log('here');
      selectedContacts = [...settings['contacts']];
      selectedContacts.splice(settings['contacts'].indexOf(contactId), 1);
    }
    else if (settings['contacts'].length == 2) {
      return;
    }
    else if (settings['contacts'].length < 2) {
      selectedContacts = [...settings['contacts'], contactId];
    }
    else {
      selectedContacts = [contactId];
    }
    let newSettings = Object.assign({}, settings);
    
    newSettings['contacts'] = selectedContacts;
    
    if (!newSettings['info']) {
      newSettings['info'] = {};
      newSettings['info'][contactId] = { phoneNumber, contactName };
    }
    else if (!newSettings['info'][contactId]) {
      newSettings['info'][contactId] = { phoneNumber, contactName };;
    }

    setSettings(newSettings);
    console.log('new settings', newSettings);
  
    storage.save({
      key: 'settings',
      data: newSettings,
    });
  }

  const isContactSelected = (contactId) => {
    return settings['contacts'] && settings['contacts'].includes(contactId);
  }

  const createRows = () => {
    let rows = contactInfo.map((contact) => {
      let disabled = !contact.phoneNumbers || contact.phoneNumbers.length == 0;
      console.log("CHECKING ABILITY", contact);
      return {
        title: contact.name,
        renderAccessory: () => (
          <Switch
          value={isContactSelected(contact.id)}
          onChange={() => {
            selectContact(contact)
            console.log('contact', contact);
          }}
          disabled={disabled}
          />
        ),
        key: contact.id
      }
    });
    rows.sort((a, b) => {
      return a.title > b.title;
    });
    return rows;
  }

  return contactInfo.length != 0 ? <ContactsSelection contactInfo={createRows()} /> : <Text>Loading Contacts</Text>

}

export default ContactsScreen;

const ContactsSelection = (contactInfo) => {
  // const { settings, setSettings } = useContext(SettingsContext);

  const renderHero = () => (
    <View style={styles.heroContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heroTitle}>Contacts</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* {console.log('CONTACT INFO', contactInfo)} */}
      <StatusBar barStyle='light-content' backgroundColor='#8c231a' />

      <SettingsScreen
      data={[
        {type: 'CUSTOM_VIEW', key: 'hero', render: renderHero, },

        {
          type: 'SECTION',
          header: '',
          rows: contactInfo.contactInfo,
        },
      ]}
      globalTextStyle='Avenir'
      />
    </View>
  );
}