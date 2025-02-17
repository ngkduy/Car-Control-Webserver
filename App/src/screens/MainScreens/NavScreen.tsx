import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import ControlScreen from './ControlScreen';
import IntroduceScreen from './IntroduceScreen';
import Phoibaycreen from './Phoibaycreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-elements/dist/helpers';
const Tab = createBottomTabNavigator();

export default function NavScreen() {


  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Control"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Control') {
              iconName = focused ? 'settings-sharp' : 'settings-outline';
            } else if (route.name === 'Introduce') {
              iconName = focused ? 'person' : 'person-outline';
            }
            else if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: '#d0c5f0', // Đặt màu nền của tab bar
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Phoibaycreen} options={{}} />
        <Tab.Screen name="Control" component={ControlScreen} options={{}} />
        <Tab.Screen name="Introduce" component={IntroduceScreen} options={{}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
