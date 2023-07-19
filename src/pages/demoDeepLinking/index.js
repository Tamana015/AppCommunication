import {ActionNames, AppNames, StateNames} from '../../navigator/appDetails';
import {Button, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {openApp, parseUri} from '../utils/appLinkUtils';

import SelectDropdown from 'react-native-select-dropdown';
import {createApptJson} from './../utils/constants';

export const DemoDeepLinking = ({route}) => {
  const [apptData, setApptData] = useState(JSON.stringify(createApptJson));
  const [routeName, setRoutename] = useState();
  const [data, updateData] = useState(createApptJson);

  const [isValidJson, setJsonFormatValid] = useState(true);

  const updateRoute = useCallback(screenType => {
    setRoutename(screenType);
  }, []);

  const onAppointment = useCallback(data => {
    try {
      setApptData(data);
      setJsonFormatValid(true);
      const jsonObject = JSON.parse(data);
      updateData(jsonObject);
    } catch (error) {
      setJsonFormatValid(false);
    }
  }, []);

  const Screens = [
    'create-appointment',
    'appointment-list',
    'available-appointment',
    'view-appointment',
  ];

  const validateJson = useCallback(() => {
    if (!isValidJson || !routeName) {
      alert('Invalid Json or route Name');
    } else {
      openApp({
        app: AppNames.MAPPT,
        screen: routeName,
        action: 'remove',
        isNewRequest: true,
        data: data,
        callbackAction: ActionNames.GOTOPB,
        callbackApp: AppNames.DT,
        callbackState: StateNames.deeplinkingState,
      });
    }
  }, [routeName, isValidJson, data]);

  React.useEffect(() => {
    if (route?.params && route.params) {
      const params = parseUri(route);
      alert('Response : ' + JSON.stringify(params));
    }
  }, [route]);

  return (
    <View style={{margin: 16}}>
      <TextInput
        label="json string for object"
        showField={true}
        value={apptData}
        onChangeText={onAppointment}
        style={{
          height: 150,
          backgroundColor: '#FFF',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#444',
          marginBottom: 20,
        }}
        editable
        multiline
        numberOfLines={4}
      />

      <View>
        <Text color="black">App state/ screen route name </Text>
        <SelectDropdown
          data={Screens}
          buttonStyle={{
            width: '100%',
            height: 50,
            backgroundColor: '#FFF',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#444',
            marginBottom: 20,
          }}
          onSelect={(selectedItem, index) => {
            updateRoute(selectedItem);
          }}
          rowStyle={{backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'}}
          rowTextStyle={{color: '#444', textAlign: 'left'}}
        />
      </View>
      <Button
        title={'Open MAPPT'}
        onPress={validateJson}
        color="red"
        enableRedButton={false}
        disabled={false}
      />
    </View>
  );
};
