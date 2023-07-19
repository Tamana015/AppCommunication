import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {getRouteData, linking} from './navigator/DeepLinking';

import {DeviceEventEmitter} from 'react-native';
import Navigator from './navigator';
import PropTypes from 'prop-types';

export const App = data => {
  const navigationRef = useNavigationContainerRef();
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'deepLinking',
      params => {
        console.log('deepLinking', params);
        const routeInfo = getRouteData(params);
        if (routeInfo.isNewRequest) {
          navigationRef.reset({
            index: 0,
            routes: [
              {
                name: routeInfo.routeName,
                params: {
                  ...routeInfo.data,
                },
              },
            ],
          });
        } else {
          console.log('###');
          navigationRef.navigate(routeInfo.routeName, {...routeInfo.data});
        }
      },
    );
    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialProps = useMemo(() => {
    return getRouteData(data);
  }, [data]);

  return (
    <>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Navigator initialProps={initialProps} />
      </NavigationContainer>
    </>
  );
};
App.propTypes = {
  data: PropTypes.object,
};
