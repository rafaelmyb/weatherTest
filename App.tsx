import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Details from './src/Screens/Details';
import Home from './src/Screens/Home';
import GooglePaySuccess from './src/Screens/GooglePaySuccess';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          title: 'Weather',
          headerStyle: {
            backgroundColor: '#e1e1e6',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Details',
            headerBackImageSource: require('./src/assets/images/leftArrow.png'),
          }}
        />
        <Stack.Screen
          name="GooglePaySuccess"
          component={GooglePaySuccess}
          options={{
            title: 'Google Pay',
            headerBackImageSource: require('./src/assets/images/leftArrow.png'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
