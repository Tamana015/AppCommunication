import {AppNames} from './appDetails';
import {Routes} from './routeNames';

export const linking = {
  prefixes: [`${AppNames.MAPPT}://`],
  config: {
    screens: {
      [Routes.home]: 'home',
    },
  },
};
export const getRouteData = data => {
  let routeName = 'home';
  let isNewRequest = false;
  let payload = {};
  try {
    payload = JSON.parse(data);
    isNewRequest = payload.isNewRequest;
    switch (payload.screen) {
      case 'home':
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
