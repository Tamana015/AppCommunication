import {Button, TextInput, View} from 'react-native';

import {PackageNames} from '../navigator/packageNames';
import {createApptJson} from './utils/constants';
import {deepLinkToApp} from './utils/appLinkUtils';
import {useState} from 'react';

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

  return (
    <View>
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
        title={'Create Appointment'}
        onPress={() => {
          try {
            const object = JSON.parse(apptData);
            deepLinkToApp({
              packageToCall: PackageNames.MAPPT,
              data: object,
              appToCall: 'MAPPT',
              appToState: routeName,
            });
          } catch (e) {
            alert('Invalid json');
          }
        }}
        color="red"
        enableRedButton={false}
        disabled={false}
      />
    </View>
  );
};
