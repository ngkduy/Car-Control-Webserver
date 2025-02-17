import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Slider, Image, Button} from 'react-native-elements';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
const ControlScreen = () => {
  useEffect(() => {
    const config = {
      apiKey: 'AIzaSyA0DvtrbrcWud8TCis7yxxUvnLESmosz08',
      appId: '1:736527088632:android:afcb7bb53a725d1064340d',
      databaseURL:
        'https://appfirebase-42f15-default-rtdb.asia-southeast1.firebasedatabase.app/',
      projectId: 'appfirebase-42f15',
      messagingSenderId: '736527088632', // client_id trong google-services.json
      storageBucket: 'appfirebase-42f15.appspot.com',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else firebase.app();
  }, []);
  const [value, setValue] = useState(100); // Giá trị mặc định ban đầu là 0
  const handleSliderChange = (newValue: any) => {
    setValue(newValue); // Cập nhật giá trị của slider
    database().ref('/Control').update({SPEED: value});
  };
  database().ref('/Control/UP').set('OFF');
  database().ref('/Control/DOWN').set('OFF');
  database().ref('/Control/LEFT').set('OFF');
  database().ref('/Control/RIGHT').set('OFF');
  database().ref('/Control/SPEED').set(value);
  //TEST------------------
  database().ref('/Control1').set('OFF');
  //------------------------
  const [ip, setIp] = useState('');
  //database().ref('/IP').set('');
  const [isConnect, setIsConnect] = useState(true);

  database()
    .ref('/IP')
    .on('value', snapshot => {
      setIp(snapshot.val());
      if (ip != '') {
        setIsConnect(true);
      } else {
        //setIp("");
        setIsConnect(false);
      }
    });

  const image = require('./img/br.jpg');
  const up = require('./img/arrow_up.png');
  const down = require('./img/arrow-down.png');
  const left = require('./img/arrow-left.png');
  const right = require('./img/arrow_right.png');
  const circle = require('./img/circle.png');
  const yes = require('./img/yes.png');
  const no = require('./img/no.png');

  const [isIconPressed, setIsIconPressed] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.header}>
          <Image
            source={require('./img/0305-logo-ctu.png')}
            containerStyle={{width: '30%', height: '100%'}}
            resizeMode="contain"
            style={{flex: 1}}
          />
          <View style={[styles.header_text]}>
            <Text
              style={{fontSize: 15, color: 'darkorange', fontWeight: 'bold'}}>
              PHÁT TRIỂN ỨNG DỤNG DI ĐỘNG
            </Text>
            <Text style={{fontSize: 25, color: 'darkblue', fontWeight: 'bold'}}>
              XE ĐIỀU KHIỂN TỪ XA
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.getIP}>
            <Text style={styles.IPText}>IP: {ip}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.IPText}>
                {isConnect ? 'Connected' : 'Not connect'}
              </Text>
              <Image
                source={isConnect ? yes : no}
                style={{width: 23, height: 26,}}
                resizeMode='contain'
                ></Image>
            </View>
          </View>
          <View style={styles.other}></View>
          <View style={styles.control}>
            <View style={styles.top_control}>
              <TouchableOpacity
                onPressIn={() => database().ref('/Control1').update({status: 'UP'})}
                onPressOut={() =>
                  database().ref('/Control1').update({status: 'OFF'})
                }
                onPress={() =>
                  database()
                    .ref('/Control1')
                    .update({status: 'UP'})
                    .then(() => database().ref('/Control1').update({status: 'OFF'}))
                }>
                <Image source={up} style={{width: 75, height: 75}}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.center_control}>
              <TouchableOpacity
                onPressIn={() =>
                  database().ref('/Control1').update({status: 'LEFT'})
                }
                onPressOut={() =>
                  database().ref('/Control1').update({status: 'OFF'})
                }
                onPress={() =>
                  database()
                    .ref('/Control1')
                    .update({status: 'LEFT'})
                    .then(() =>
                      database().ref('/Control1').update({status: 'OFF'}),
                    )
                }>
                <Image source={left} style={{width: 75, height: 75}}></Image>
              </TouchableOpacity>
              <TouchableOpacity
                >
                <Image source={circle} style={{width: 150, height: 150}}></Image>
              </TouchableOpacity>
              <TouchableOpacity
                onPressIn={() =>
                  database().ref('/Control1').update({status: 'RIGHT'})
                }
                onPressOut={() =>
                  database().ref('/Control1').update({status: 'OFF'})
                }
                onPress={() =>
                  database()
                    .ref('/Control1')
                    .update({status: 'RIGHT'})
                    .then(() =>
                      database().ref('/Control1').update({status: 'OFF'}),
                    )
                }>
                <Image source={right} style={{width: 75, height: 75}}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.bottom_control}>
              <TouchableOpacity
                onPressIn={() =>
                  database().ref('/Control1').update({status: 'DOWN'})
                }
                onPressOut={() =>
                  database().ref('/Control1').update({status: 'OFF'})
                }
                onPress={() =>
                  database()
                    .ref('/Control1')
                    .update({status: 'DOWN'})
                    .then(() =>
                      database().ref('/Control1').update({status: 'OFF'}),
                    )
                }>
                <Image source={down} style={{width: 75, height: 75}}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.slider}>
            {}
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 30,
            }}>
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default ControlScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 6,
  },
  header_text: {
    flex: 1,
    fontSize: 25,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getIP: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  IPText: {
    fontSize: 20,
    paddingRight: 10
  },
  other: {
    flex: 1,
  },
  control: {
    flex: 4,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 25,
  },
  top_control: {
    flex: 1,
  },
  center_control: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottom_control: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
  },
});

{
  /* <Slider
        style={{padding: 10, backgroundColor:'orange'}}
        value={value}
        minimumValue={10}
        maximumValue={100}
        step={1}
        onValueChange={setValue}
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{height: 25, width: 20,backgroundColor: 'transparent'}}
        maximumTrackTintColor='white'
        minimumTrackTintColor='black'
        thumbTintColor='blue'
        thumbProps={{
          children: (
            <Icon
              name='circle'
              type="font-awesome"
              iconStyle={{color: 'red'}}
              ></Icon>
          )
        }}
      ></Slider> */
}
