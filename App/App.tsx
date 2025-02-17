import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

import SignUpScreen from './src/screens/signUpScreen';
import SignInScreen from './src/screens/signInScreen';
import LogOutScreen from './src/screens/logOutScreen';
import WorkScreen from './src/screens/WorkScreen';
import ControlScreen from './src/screens/MainScreens/ControlScreen';
import NavigateScreen from './src/screens/NavigateScreen';
import { firebase } from '@react-native-firebase/auth';
import NavScreen from './src/screens/MainScreens/NavScreen';


export default function App() {
  const [user, setUser] = useState();
  console.log('User:', user);

  const onAuthStateSave = (user: any) => setUser(user);
  useEffect(() => {
    const subcriber = auth().onAuthStateChanged(onAuthStateSave);
    return subcriber;
  });

  //Firebase
  

  return (
    <View style={styles.container}>
      {user ? <NavScreen /> : <NavigateScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

