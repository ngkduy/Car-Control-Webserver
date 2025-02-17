import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  TouchableOpacityBase,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
const logOutScreen = () => {
  const onLogOut = () => {
    auth()
      .signOut()
      .then(() => Alert.alert('User signed out!'));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Out</Text>
      <Button
        title="Log Out"
        onPress={onLogOut}
      />
    </View>
  );
};

export default logOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
