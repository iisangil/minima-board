import { useContext } from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import { SettingsContext } from '../context/settingsContext';
import { updateTirePressure } from '../components/TirePressure';

import { styles } from '../components/Styles';

const DeveloperScreen = ({ navigation }) => {
  const { settings, setSettings } = useContext(SettingsContext);

  const handleTirePressure = (pressure) => {
    updateTirePressure(pressure)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={styles.text}></Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                style={styles.input}
                onChangeText={handleTirePressure}
                placeholder="Tire Pressure"
                keyboardType="numeric"
            />
        </View>
      <Button title='Back to Home' onPress={() => navigation.navigate('Home')} />
    </View>
  )
}

export default DeveloperScreen;