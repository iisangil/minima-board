import { View, Button } from 'react-native';
import Emergency from '../components/Emergency';
import Gas from '../components/Gas';
import RPM from '../components/RPM';
import Seatbelt from '../components/Seatbelt.jsx';
import TirePressure from '../components/TirePressure';

const ApplicationScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Emergency />
      <Gas/>
      <RPM/>
      <Seatbelt/>
      <TirePressure />
      <Button
      title="Back to Home"
      onPress={() => navigation.navigate("Home")}
      />
    </View>
  )
}

export default ApplicationScreen;