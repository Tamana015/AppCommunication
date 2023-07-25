import {AppNames} from './appDetails';
import {Routes} from './routeNames';

export const linking = {
  prefixes: [`${AppNames.MPOS}://`, `${AppNames.SNS}://`],
  config: {
    screens: {
      [Routes.home]: 'Home',
    },
  },
};
export const getRouteData = data => {
  let routeName = data.screen || 'Home';
  let isNewRequest = false;
  let payload = {};
  try {
    if (data?.data) {
      payload = JSON.parse(data.data);
    } else {
      payload = JSON.parse(data);
    }
    isNewRequest = payload.isNewRequest;
    switch (payload.screen) {
      case 'Home':
        routeName = Routes.home;
        break;
      case 'start-a-vtv':
        routeName = Routes.startVtv;
        break;
      case 'search':
        routeName = Routes.search;
        break;
      default:
        routeName = Routes.home;
        break;
    }
  } catch (error) {}
  return {
    routeName,
    data: payload,
    isNewRequest,
  };
};
