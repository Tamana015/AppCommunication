import {DemoDeepLinking} from './pages/HomePage';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/native-stack';

// Create a stack navigator
const Stack = createStackNavigator();

// Create the main app component
const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DemoDeepLinking} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
