import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import signInScreen from './signInScreen';
import ControlScreen from './MainScreens/ControlScreen';
import 'react-native-gesture-handler';
import signUpScreen from './signUpScreen';

const Stack = createNativeStackNavigator();

export default function NavigateScreen() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={signInScreen} />
      <Stack.Screen name="Main" component={ControlScreen} />
      <Stack.Screen name="SignUp" component={signUpScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
