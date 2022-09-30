import { View, Button } from 'react-native';
import Emergency from '../components/Emergency';

const ApplicationScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Emergency />
      <Button
      title="Back to Home"
      onPress={() => navigation.navigate("Home")}
      />
    </View>
  )
}

export default ApplicationScreen;