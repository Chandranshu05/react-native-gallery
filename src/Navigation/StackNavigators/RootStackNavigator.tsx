import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'src/Screens/Login/LoginScreen';
import HomeScreen from 'src/Screens/Home/HomeScreen';

const RootStack = createStackNavigator();

function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
