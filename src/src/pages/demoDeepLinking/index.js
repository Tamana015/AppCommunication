import {ActionNames, AppNames, StateNames} from '../../navigator/appDetails';
import {Button, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {createApptJson, vtvData} from './../utils/constants';
import {openApp, parseUri} from '../utils/appLinkUtils';

import SelectDropdown from 'react-native-select-dropdown';

export const DemoDeepLinking = ({route}) => {
  const [apptData, setApptData] = useState(JSON.stringify(createApptJson));
  const [routeName, setRoutename] = useState();
  const [data, updateData] = useState(createApptJson);

  const [isValidJson, setJsonFormatValid] = useState(true);

  const updateRoute = useCallback(screenType => {
    setRoutename(screenType);
    let data = {siteId: '1284'};
    switch (screenType) {
      case 'create-appointment':
        data = createApptJson;
        break;
      case 'modify-appointment':
        data = {workOrderId: '0WO6u000000DosZGAS'};
        break;
      case 'search':
        data = '';
        break;
      case 'customer-summary':
        data = '';
        break;
      case 'start-a-vtv':
        data = vtvData;
        break;
      case 'waitlist':
        data = vtvData;
        break;
      default:
        data = {siteId: '1284'};
    }

    setApptData(JSON.stringify(data));
    updateData(data);
  }, []);

  const onAppointment = useCallback(async data => {
    try {
      setApptData(data);
      setJsonFormatValid(true);
      const jsonObject = await JSON.parse(data);
      updateData(jsonObject);
    } catch (error) {
      setJsonFormatValid(false);
    }
  }, []);

  const Screens = [
    'create-appointment',
    'appointment-list',
    'available-appointment',
    'modify-appointment',
    'waitlist',
    'start-a-vtv',
    'search',
    'customer-summary',
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
        callbackApp: AppNames.MPOS,
        callBackScreen: StateNames.deeplinkingState,
      });
    }
  }, [routeName, isValidJson, data]);

  const openSalesApp = useCallback(() => {
    openApp({
      app: AppNames.SNS,
      screen: routeName,
      action: 'customer',
      isNewRequest: true,
      data: data,
      callbackAction: ActionNames.GOTOPB,
      callbackApp: AppNames.MPOS,
      callBackScreen: 'register-customer-vehicle',
    });
  }, [routeName]);

  React.useEffect(() => {
    if (
      route?.params &&
      Object.keys(route?.params).length > 0 &&
      !(Object.keys(route?.params).length === 1 && route?.params?.screen)
    ) {
      const params = parseUri(route);
      alert('Response : ' + JSON.stringify(params));
    }
  }, [route]);

  return (
    <View>
      <View
        style={{
          backgroundColor: '#404040',
          padding: 4,
          marginBottom: 15,
        }}>
        <Text style={{fontSize: 13, textAlign: 'center', color: 'white'}}>
          Version 2.0
        </Text>
      </View>
      <View style={{margin: 8}}>
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
            rowStyle={{
              backgroundColor: '#EFEFEF',
              borderBottomColor: '#C5C5C5',
            }}
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

        <View style={{margin: 16}}>
          <Button
            title={'Open S and S'}
            onPress={openSalesApp}
            color="green"
            enableRedButton={false}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
};
