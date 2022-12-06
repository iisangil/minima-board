import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Pressable} from 'react-native';
import { SettingsContext, storage } from '../context/settingsContext';
import { useContext, useState} from 'react';
import { styles } from '../components/Styles';
import Modal from "react-native-modal";
import SelectList from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons';

var themes = {}
var data = []

export function CustomThemeScreen({navigation}){
    const { settings, setSettings } = useContext(SettingsContext);
    const [selected, setSelected] = React.useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [name, onChangeName] = React.useState(null);

    const loadThemes = () => {
        storage.load({
            key: 'themes',
            autoSync: true
          }).then(ret => {
            themes = ret
            console.log("Themes loaded:", themes)
            data = []
            for (const t in themes) {
                data.push({key:t, value: t})
            }
            console.log("loaded themes: ", data)
          })
          .catch(err => {
            themes = {}
            console.log("No Themes Found")
          });
    }

    loadThemes()



    const setTheme = (theme) => {
        var background = themes[theme]['Background']
        var fontColor = themes[theme]['FontColor']

        let newSettings = Object.assign({}, settings);

        newSettings['Background'] = background;
        newSettings['FontColor'] = fontColor;

        setSettings(newSettings);
        console.log("NEWSETTINGS", newSettings);
    
        storage.save({
          key: 'settings',
          data: newSettings
        });
    }

    const deleteTheme = () => {
        delete themes[selected]
    
        storage.save({
          key: 'themes',
          data: themes
        });

        setSelected("")
        loadThemes()
        // Really jank but there's no way to refresh a screen in react native
        // So this is the best thing I could come up with, forcing the user back to the settings page
        // The reason why you have to refresh is because for some reason the drop down list does
        // not refresh when data updates. Not sure if it is because I'm doing it wrong or if the library has a bug,
        // but from my understanding it should just update when the state does.
        navigation.navigate('Settings')
    }

    let inputStyle = Object.assign({}, styles.input);
    inputStyle['borderColor'] = settings['FontColor']
    inputStyle['color'] = settings['FontColor']

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        console.log("Modal", isModalVisible)
    }

    const saveTheme = () => {
        console.log("Saving theme", name);
        themes[name] = {}
        themes[name]['Background'] = settings['Background']
        themes[name]['FontColor'] = settings['FontColor']

        console.log("NEWTHEMES", themes);

        storage.save({
          key: 'themes',
          data: themes
        });

        loadThemes()
        toggleModal()
        navigation.navigate('Settings') 
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Modal isVisible={isModalVisible} avoidKeyboard={true} backdropOpacity={.90} backdropColor={settings["Background"]}>
            <TextInput
                style={inputStyle}
                onChangeText={onChangeName}
                value={name}
                placeholder="Theme Name"
                keyboardType="default"
            />
            <Button title="Save Theme" onPress={saveTheme} color={settings["FontColor"]}/>
            <Button title="Cancel" onPress={toggleModal} color={settings["FontColor"]}/>
        </Modal>

        <SelectList 
            placeholder="Select Custom Theme"
            setSelected={setSelected} 
            dropdownStyles={{color: settings["FontColor"]}}
            dropdownTextStyles={{color: settings["FontColor"]}}
            dropdownItemStyles={{color: settings["FontColor"]}}
            boxStyle={{color: settings["FontColor"]}}
            inputStyle={{color: settings["FontColor"]}}
            data={data} 
            save="value"
            search={false}
            arrowicon={<FontAwesome name="chevron-down" size={12} color={settings['FontColor']} />}
        />

        <Button title="Choose Selected Theme" color={settings["FontColor"]} onPress={() => setTheme(selected)} />
        <Button title="Delete Selected Theme" color={settings["FontColor"]} onPress={deleteTheme} />
        <Button title="Save Current Theme" color={settings["FontColor"]} onPress={toggleModal} />
        <Button title="Back to Settings" color={settings["FontColor"]} onPress={() => navigation.navigate('Settings')} />
      </View>
    );
  }