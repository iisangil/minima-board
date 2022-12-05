import { useEffect, useState, useContext } from 'react';
import { View, Text, StatusBar, Switch, ActivityIndicator, StyleSheet } from 'react-native';
import { SettingsContext, storage } from '../context/settingsContext';
import * as Contacts from 'expo-contacts';
import { SettingsScreen } from 'react-native-settings-screen';
import { SearchBar } from 'react-native-ios-kit';
import { styles } from '../components/Styles';

const ContactsScreen = (navigation) => {
  const [contactInfo, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const selectContact = (contact) => {
    let contactName = contact.name;
    let phoneNumber = contact.phoneNumbers[0].number;
    let contactId = contact.id;

    let selectedContacts;
    if (!settings['contacts']) {
      selectedContacts = [contactId];
    } 
    else if (settings['contacts'].includes(contactId)) {
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
  
    storage.save({
      key: 'settings',
      data: newSettings,
    });
  }

  const isContactSelected = (contactId) => {
    return settings['contacts'] && settings['contacts'].includes(contactId);
  }

  const createRows = () => {
    let filteredContacts = contactInfo.filter(contact => contact.name.toUpperCase().includes(search.toUpperCase()));
    let rows = filteredContacts.map((contact) => {
      let disabled = !contact.phoneNumbers || contact.phoneNumbers.length == 0;
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      flexDirection: "column",
    }
  });

  let props = {
    contactInfo: createRows(),
    search: search,
    setSearch: setSearch,
  }

  return contactInfo.length != 0 ? (
    <ContactsSelection {...props} />
  ) : (
    <View style={[styles.container]}>
      <ActivityIndicator size='large' style={{ padding: '5%' }}/>
      <Text>Loading Contacts...</Text>
    </View>
  )
}

export default ContactsScreen;

const ContactsSelection = (props) => {
  const { contactInfo, search, setSearch } = props;

  const renderHero = () => (
    <View style={styles.heroContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heroTitle}>Contacts</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <SearchBar
      value={search}
      onValueChange={text => setSearch(text)}
      withCancel
      animated
      />
      <StatusBar barStyle='light-content' backgroundColor='#8c231a' />

      <SettingsScreen
      data={[
        {type: 'CUSTOM_VIEW', key: 'hero', render: renderHero, },

        {
          type: 'SECTION',
          header: '',
          rows: contactInfo,
        },
      ]}
      globalTextStyle='Avenir'
      />
    </View>
  );
}