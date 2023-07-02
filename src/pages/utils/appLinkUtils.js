var SendIntentAndroid = require('react-native-send-intent');

export const deepLinkToApp = ({
  appToCall,
  appToState,
  callbackApp,
  callbackState,
  data,
  packageToCall,
  callbackPackageName,
}) => {
  let routeData, url;
  if (!data && !callbackPackageName) {
    routeData = undefined;
  } else {
    routeData = data ? {...data} : {};
    callbackApp ? (routeData.appToCall = callbackApp) : routeData;
    callbackState ? (routeData.appToState = callbackState) : routeData;
    callbackPackageName
      ? (routeData.packageToCall = callbackPackageName)
      : routeData;
    routeData = JSON.stringify({...routeData});
  }
  url = `${appToCall}:///${appToState}`;
  if (routeData !== undefined) {
    url = `${url}?data=${routeData}`;
  }
  console.warn(url);
  SendIntentAndroid.openAppWithData(packageToCall, url)
    .then(prom => {
      console.log(prom);
    })
    .catch(e => {
      console.log(e);
    });
};

export const parseUri = data => {
  return JSON.parse(data?.params?.data);
};
