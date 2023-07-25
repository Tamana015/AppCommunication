import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import {CardStyleInterpolators} from '@react-navigation/stack';
import {DemoDeepLinking} from '../pages/demoDeepLinking';
import {HandleDifferentLinking} from '../pages/handlingDifferentAppLinking';
import {Routes} from './routeNames';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

const Navigator = ({initialProps}) => {
  console.log(initialProps, '********');
  return (
    <RootStack.Navigator
      initialRouteName={
        initialProps?.routeName || initialProps?.data?.screen || 'home'
      }
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <RootStack.Screen
        name={Routes.home}
        component={DemoDeepLinking}
        initialParams={{...initialProps?.data}}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name={Routes.startVtv}
        component={HandleDifferentLinking}
        initialParams={{...initialProps?.data}}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            elevation: 0,
          },
        }}
      />
      <RootStack.Screen
        name={Routes.search}
        component={HandleDifferentLinking}
        initialParams={{...initialProps?.data}}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            elevation: 0,
          },
        }}
      />
    </RootStack.Navigator>
  );
};

export default Navigator;
