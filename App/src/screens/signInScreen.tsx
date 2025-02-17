import {StyleSheet, TextInput, View, Text, Alert, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const signInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const onSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('response: ', response);
        Alert.alert('Log In Successfully!');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert(
            'Warning!!',
            'Infomation is not corect.Please check your email and password again!',
          );
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Warning', 'Email is not correct!');
        }
        console.error(error);
      });
  };

  const [state, setSate] = useState(false);

  return (
    <ImageBackground source={require('./MainScreens/img/brsignin.png')} style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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

      <View style={styles.sign}>
        <View>
          <Button title="Sign In" onPress={onSignIn} />
        </View>
        <View>
          <Button 
            title="Sign Up" 
            onPress={()=> navigation.navigate("SignUp")} 
            buttonStyle={{backgroundColor: 'darkred'}} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default signInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    resizeMode: 'contain'
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'black'
  },
  sign: {
    flexDirection: 'row',
  },
});
