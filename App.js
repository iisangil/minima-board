import * as React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const image = { uri: "https://img.freepik.com/free-vector/paper-style-white-monochrome-background_52683-66444.jpg?w=2000"};
function HomeScreen({ navigation }) {
  return (
    <View style={{backgroundColor: '#FFCB05', flex:1}}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style ={styles.text}>Minima Board</Text>
        <Button
          title="Change Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <Button
          title="Choose Display"
          onPress={() => navigation.navigate('Display')}
        />
      </ImageBackground>
      
    </View>
  );
}

function DisplayScreen({navigation}){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/*<Button
        title="Go back to Settings"
        onPress={() => navigation.push('Settings')}
      />*/}
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      
      {/*<Button title="Go back" onPress={() => navigation.goBack()} />*/}
      {/*<Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />*/}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Display" component={DisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText:{
    fontSize: 50,
    fontWeight: "bold",
    color: "#00274C", 
    alignItems: 'center', 
    justifyContent: 'center'
    
  }, 
  image: {
    flex: 1,
    justifyContent: "center"
  },
})

export default App;