import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react';
const ManChao = ({ navigation }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate('DangNhap');
      }, 3000);

      return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View >
            <ImageBackground
                style={{ height: 620 ,alignItems:'center',justifyContent:'center'}}
                source={{ uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg' }}
            >
                <Image
                    style={{ height: 150, width: 150, borderRadius: 20 }}
                    source={{ uri: 'https://zpsocial-f47-org.zadn.vn/0e68c671d2e53dbb64f4.jpg' }} />
                <Text style={{marginTop:50,color:'black',fontSize:20}}>
                    Họ và Tên : Nguyễn Tuấn Dũng
                </Text >
                <Text style={{marginTop:10,color:'black',fontSize:20}}>
                    Lớp : MD18308 - CRO102 - RN 2
                </Text>
                <Text style={{marginTop:10,color:'black',fontSize:20}}>
                    Mã sinh viên : PH35067
                </Text>
            </ImageBackground>
        </View>
    );
}

export default ManChao

const styles = StyleSheet.create({})