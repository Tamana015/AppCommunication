import {Alert, Button, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {openApp} from './../utils/appLinkUtils';

export const HandleDifferentLinking = ({route}) => {
  // {"key": "start-a-vtv-hVHpGu7qcCxgmOGAZyEaZ", "name": "start-a-vtv", "params": {"action": "vtv", "data": {"siteId": "AZF 01"}, "isNewRequest": true, "screen": "start-a-vtv"}}
  const [apptData, setApptData] = useState(JSON.stringify(route?.params?.data));
  const [isSendButton, setSendButton] = useState(true);

  const onAppointment = useCallback(async data => {
    try {
      setApptData(data);
      const jsonObject = await JSON.parse(data);
      route?.params?.callBackApp && route?.params && setSendButton(false);
    } catch (error) {
      Alert('Not a Valid Json Data');
    }
  }, []);

  const validateJson = useCallback(() => {
    openApp({
      app: route?.params?.callBackApp,
      screen: route?.params?.callBackScreen,
      action: route?.params?.action,
      isNewRequest: true,
      data: route?.params?.data || {},
    });
  }, []);

  return (
    <View style={{margin: 16}}>
      <Text style={{color: 'black', marginBottom: 2}}>App params Details</Text>
      <View
        style={{
          padding: 10,
          backgroundColor: '#FFF',
          borderRadius: 8,
          borderColor: '#444',
          marginBottom: 20,
        }}>
        <Text>{JSON.stringify(route?.params)} </Text>
      </View>
      <Text style={{color: 'black', marginBottom: 2}}>Data</Text>
      <TextInput
        label="Data Received from Route"
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
      />
      <Button
        title={'Send Request'}
        onPress={validateJson}
        color="red"
        enableRedButton={false}
        disabled={isSendButton}
      />
    </View>
  );
};
