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
    requestObject.callBackApp = AppNames.DT;
  }
  LinkingCalls.openApp(app, screen, JSON.stringify(requestObject));
};

export const parseUri = data => {
  if (data?.params && data?.params?.data) {
    const decodedJSON = decodeURIComponent(data?.params?.data);
    return JSON.parse(decodedJSON);
  }
  return {};
};
