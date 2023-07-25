import {AppNames} from '../../navigator/appDetails';
import {NativeModules} from 'react-native';

const {LinkingCalls} = NativeModules;

export const openApp = ({
  app,
  screen,
  action,
  isNewRequest,
  data,
  callBackScreen,
  callBackAction,
}) => {
  const requestObject = {
    screen: screen,
    action: action,
    isNewRequest: isNewRequest,
    data: data,
  };

  if (callBackScreen) {
    requestObject.callBackScreen = callBackScreen;
    requestObject.callBackAction = callBackAction;
    requestObject.callBackApp = AppNames.MPOS;
  }
  console.warn(app, screen, requestObject);
  LinkingCalls.openApp(app, screen, JSON.stringify(requestObject));
};

export const parseUri = data1 => {
  let data = data1?.params?.data;

  if (data) {
    if (typeof data === 'string') {
      try {
        data = decodeURIComponent(data);
      } catch (err) {}
      data = JSON.parse(data);
    }
  }
  return data || {};
  // if (data?.params && data?.params?.data) {
  //   const decodedJSON = decodeURIComponent(data?.params?.data);
  //   return JSON.parse(decodedJSON);
  // }
  // return {};
};
