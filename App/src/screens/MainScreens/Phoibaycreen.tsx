import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
export default function Phoibaycreen() {
  return (
    <ImageBackground source={require('./img/br.jpg')} style = {styles.container}> 
      <Text style = {styles.ctu_tex}>Trường Đại Học Cần Thơ</Text>
      <Text style = {styles.bk_tex}>Trường Bách Khoa</Text>
      <Image style = {styles.img1} source={require('./img/0305-logo-ctu.png')}></Image>
      <Text style = {styles.t1_tex}>BÁO CÁO ĐỒ ÁN PHÁT TRIỂN ỨNG DỤNG THIẾT BỊ DI DỘNG</Text>
      <Text style = { styles.t2_tex}>Đề Tài:</Text>
      <Text style = {styles.t3_tex}>Điều khiển xe bằng Firebase</Text>
      <Text style ={styles.t4_tex}>GVHD: Nguyễn Văn Khanh</Text>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    container:{ justifyContent: 'center', alignItems: "center", flex: 1,
    },t1_tex: {
        padding:10,  marginBottom :20, fontSize: 30, color: 'blue', textAlign: 'center', fontWeight: 'bold'},
    t3_tex: {
        fontSize: 30, color: 'red', textAlign: 'center', fontWeight: 'bold'},
    t2_tex: {
        marginBottom: 10, textAlign: 'center',  color: 'black',  fontSize: 25,  textDecorationLine: 'underline'},
    t4_tex: {
        marginTop : 20, textAlign: 'center',  color: 'blue',  fontSize: 30,  fontWeight: 'bold'   },
    img1: { marginBottom: 20, width: 200, height: 200,},
    ctu_tex: { marginTop : 0, textAlign: 'center',  color: 'blue',  fontSize: 30,  fontWeight: 'bold'   },
    bk_tex: { marginBottom:10, marginTop : 5, textAlign: 'center',  color: 'blue',  fontSize: 30,  fontWeight: 'bold'   },
    fixToText: {
        flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20},
});