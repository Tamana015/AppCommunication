import {Button, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {PackageNames} from './navigator/packageNames';
import {createApptJson} from './pages/utils/constants';
import {createStackNavigator} from '@react-navigation/stack';
import {deepLinkToApp} from './pages/utils/appLinkUtils';

const Stack = createStackNavigator();

export const DemoDeepLinking = () => {
  const [apptData, setApptData] = useState(createApptJson);
  const [routeName, setRoutename] = useState('CreateAppointment');
  const updateNum = t => {
    setRoutename(t);
  };
  const updateMake = t => {
    // const jsonObject = JSON.parse(data);
    setApptData(t);
  };

  const HomeScreen = () => (
    <View style={{margin: 16}}>
      <TextInput
        label="json string for object"
        showField={true}
        value={apptData}
        onChange={t => updateMake(t)}
        style={{
          height: 100,
          borderColor: 'gray',
          borderWidth: 2,
          margin: 10,
          multipleLine: true,
        }}
        editable
        multiline
        numberOfLines={4}
      />
      <TextInput
        label="App state/ screen route name "
        keyboardType="phone-pad"
        showField={true}
        value={routeName}
        onChange={t => updateNum(t)}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 2,
          margin: 10,
          multipleLine: true,
        }}
      />
      <Button
        title={'Open'}
        onPress={() => {
          try {
            const object = JSON.parse(apptData);
            deepLinkToApp({
              packageToCall: PackageNames.MAPPT,
              data: object,
              appToCall: 'MAPPT',
              appToState: routeName,
              callbackPackageName: PackageNames.DT,
              callbackApp: 'DT',
              callbackState: 'Home',
            });
          } catch (e) {
            debugger;
            alert('Invalid json');
          }
        }}
        color="red"
        enableRedButton={false}
        disabled={false}
      />
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
