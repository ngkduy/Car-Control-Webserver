import {StyleSheet, TextInput, View, Text, Alert, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
const signUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const onRegister = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <ImageBackground source={require('./MainScreens/img/brsignin.png')} style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={{flexDirection: 'row'}}>
        <Button title="Sign Up" onPress={onRegister} />
        <Button
          title="Cancel"
          onPress={() => navigation.navigate('SignIn')}
          buttonStyle={{backgroundColor: 'brown'}}
        />
      </View>
    </ImageBackground>
  );
};

export default signUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    
  },
});
