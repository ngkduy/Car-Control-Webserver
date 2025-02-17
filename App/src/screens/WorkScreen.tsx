import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
export default function WorkScreen() {
    const [Rint, setRint] = useState('')
    const [Rfloat, setRfloat] = useState('')
    const [int, setInt] = useState('')
    const [float, setFloat] = useState('')
    
  const readInt = () => {
    database()
      .ref('/test/int')
      .on('value', snapshot => {
        setRint(snapshot.val());
      });
    database()
      .ref('/test/float')
      .on('value', snapshot => {
        setRfloat(snapshot.val());
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.large_text}>Ghi giá trị</Text>
      <Text style={styles.text}>/test/int</Text>
      <TextInput
        value={int}
        placeholder="0"
        onChangeText={setInt}
        style={styles.text_input}
      />
      <Button
        title="Write to /test/int"
        buttonStyle={{width: 200}}
        onPress={() => {
          database().ref('test/int').set(parseInt(int));
        }}
      />
      <Text style={styles.text}>/test/float</Text>
      <TextInput
        value={float}
        placeholder="0.0"
        onChangeText={setFloat}
        style={styles.text_input}
      />
      <Button
        title="Write to /test/float"
        buttonStyle={{width: 200}}
        onPress={() => {
          database().ref('test/float').set(parseFloat(float));
        }}
      />
      <Text></Text>
      <Text style={styles.large_text}>Đọc giá trị</Text>
      <Text style={styles.text}>/test/int = {int}</Text>
      <Text style={styles.text}>/test/float = {float}</Text>
      <Button
        buttonStyle={{width: 200}}
        title="Sign out"
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  large_text: {
    fontSize: 34,
    marginBottom: 10,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '400',
  },
  text_input: {
    fontWeight: '700',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    width: 250,
    textAlign: 'center',
  },
});
