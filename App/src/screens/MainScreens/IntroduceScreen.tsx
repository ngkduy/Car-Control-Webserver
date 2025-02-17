import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native-elements';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default function IntroduceScreen() {
  const handleImagePress = facebookLink => {
    Linking.openURL(facebookLink);
  };
  const handleEmailPress = email => {
    Linking.openURL(`mailto:${email}`);
  };
  const [selectedId, setSelectedId] = useState(null);
  const DATA = [
    {
      id: 1,
      path: require('./img/DTB.png'),
      hoten: 'Nguyễn Khánh Duy',
      mssv: 'B2016822',
      lop: 'Kỹ thuật máy tính',
      khoa: 'Điện tử viễn thông',
      email: 'duyb2016822@student.ctu.edu.vn',
      facebookLink: 'https://www.facebook.com/profile.php?id=100028498523598',
    },
    {
      id: 2,
      path: require('./img/DVL.png'),
      hoten: 'Nguyễn Khánh Duy',
      mssv: 'B2016887',
      lop: 'Kỹ thuật máy tính',
      khoa: 'Điện tử viễn thông',
      email: 'duyb2016887@student.ctu.edu.vn',
      facebookLink: 'https://www.facebook.com/nkdiy',
    },
    {
      id: 3,
      path: require('./img/HB.png'),
      hoten: 'Lâm Hoàng Bi',
      mssv: 'B2016884',
      lop: 'Kỹ thuật máy tính',
      khoa: 'Điện tử viễn thông',
      email: 'bib2016884@student.ctu.edu.vn',
      facebookLink: 'https://www.facebook.com/',
    },
    {
      id: 4,
      path: require('./img/MT.png'),
      hoten: 'Lê Minh Trí',
      mssv: 'B2016937',
      lop: 'Kỹ thuật máy tính',
      khoa: 'Điện tử viễn thông',
      email: 'trib2016937@student.ctu.edu.vn',
      facebookLink: 'https://www.facebook.com/',
    },
  ];

  const renderItem = ({item}) => {
    const backgroundColor = item.id % 2 ? '#99FF99' : '#CCFFCC';
    return (
      <View style={[styles.flatlist, {backgroundColor}]}>
        <Image
          transitionDuration={500}
          source={item.path}
          style={{width: 60, height: 60}}
          onPress={() => {
            setSelectedId(item.id);
            //if (selectedId == 1) {
            handleImagePress(item.facebookLink);
            //}
          }}
        />
        <View style={{flex: 1}}>
          <Text style={{flex: 1, marginLeft: 20, color: 'black'}}>Họ và tên: {item.hoten}</Text>
          <Text style={{flex: 1, marginLeft: 20, color: 'black'}}>MSSV: {item.mssv}</Text>
          <Text style={{flex: 1, marginLeft: 20, color: 'black'}}>Lớp: {item.lop}</Text>
          <Text style={{flex: 1, marginLeft: 20, color: 'black'}}>Khoa: {item.khoa}</Text>
          <TouchableOpacity onPress={() => handleEmailPress(item.email)}>
            <Text style={{flex: 1, marginLeft: 20, color: '#0000CC'}}>
              Email: {item.email}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={{fontSize: 25, color: '#596863', fontWeight: 'bold'}}>
          THÔNG TIN GIỚI THIỆU
        </Text>
      </View>
      <View style={styles.list_view}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  header: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: '#67E5B7',
    borderRadius: 10,
    margin: 1,
    borderColor: 'green',
    borderWidth: 2,
  },
  list_view: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 8,
    margin: 1,
    
  },
  flatlist: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#333333',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.9,
    elevation: 5, // Độ nâng cao của đổ bóng
  },
});
