import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Details from './src/Screens/Details';
import Home from './src/Screens/Home';

import backarrow from './src/assets/images/leftArrow.png';

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
            headerBackImageSource: backarrow,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
