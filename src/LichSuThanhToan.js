import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation,useRoute} from '@react-navigation/native';



const LichSuThanhToan = () => {
  const [lichSuThanhToan, setLichSuThanhToan] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false); 
  const route = useRoute();
  const { name,id, email, username, password, phone, avatar, address } = route.params;

  
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(); 
    setRefreshing(false); 
  };
  

  const formatPrice = price => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };


const groupByDay = () => {
  const grouped = {};
  lichSuThanhToan.forEach(item => {
    const day = moment(item.thoiGianThanhToan).format('DD/MM/YYYY'); 
    if (!grouped[day]) {
      grouped[day] = [];
    }
    grouped[day].push(item);
  });

  const sortedGrouped = Object.entries(grouped)
    .sort(([a], [b]) => b - a)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return sortedGrouped;
};

// Khi render danh sách
const groupedByDay = Object.entries(groupByDay()).map(([date, data]) => ({
  date,
  data,
})).reverse();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://65bb276752189914b5bb52a6.mockapi.io/dathanhtoan',
      );
      const filteredData = response.data.filter(item => item.idUser === userId);
      setLichSuThanhToan(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      console.error('Error details:', error);
    }
  };

  useEffect(() => {  
    fetchData();
  }, [userId]); 
  
  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
        console.log("gọi iduser thành công ", id);
      } catch (error) {
        console.error('Error retrieving user id:', error);
      }
    };
    getUserId();
  }, []);

  

  

  const renderListItem = ({item}) => (
    <View style={styles.productItem}>
      <Image style={styles.img} source={{uri: item.avatar}} />
      <View style={styles.ngang}>
        <View style={{width: 295, marginLeft: 5}}>
          <View style={styles.ngang}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'cursive',
                fontSize: 20,
                width: 170,
              }}>
              {item.tenSP}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'cursive',
                  marginTop: 5,
                }}>
                {formatPrice(item.giaSP * item.soLuong)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'cursive',
                  fontSize: 15,
                }}>
                Quantity : {item.soLuong}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderDay = ({item}) => (
    <View style={styles.dayContainer}>
      <Text style={styles.day}>{item.date}</Text>
      <FlatList
        data={item.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
      />
    </View>
  );



  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={{
          uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
        }}>
          <ImageBackground
            style={{
              width: 360,
              height: 40,
              borderTopRightRadius: 20,
              opacity: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={{
              uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
            }}>
            <Text style={styles.title}>Lịch sử thanh toán</Text>
          </ImageBackground>
        <FlatList
          data={groupedByDay}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderDay}
          onRefresh={handleRefresh} 
          refreshing={refreshing}
        />
      </ImageBackground>
      <ImageBackground
        style={{
          width: 360,
          height: 40,
          borderTopRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={{
          uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
        }}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center', opacity: 0.7}}
            onPress={() => navigation.navigate('ManHinhChinh',{ name,id, email, username, password, phone, avatar, address })}>
            <Image
              style={styles.imgadd}
              source={{
                uri: 'https://i.pinimg.com/originals/0c/02/ce/0c02ce4850d6b88d44f87271ff5f4a71.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center', opacity: 0.7}}
            onPress={() => navigation.navigate('GioHang',{ name,id, email, username, password, phone, avatar, address })}>
            <Image
              style={styles.imgadd}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/60/60992.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center', opacity: 1}}
            >
            <Image
              style={styles.imgadd}
              source={{
                uri: 'https://www.pngkey.com/png/full/394-3944032_bell-notification-noice-ring-message-alert-comments-font.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center', opacity: 0.7}}
            onPress={() => navigation.navigate('ThongTin',{ name,id, email, username, password, phone, avatar, address })}>
            <Image
              style={styles.imgadd}
              source={{
                uri: 'https://cdn-icons-png.freepik.com/256/1077/1077114.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LichSuThanhToan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dayContainer: {
    marginTop: 10,
    padding: 10,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 242,
    color: 'black',
  },
  productItem: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#222222',
    borderRadius: 5,
    alignItems: 'center',
  },
  img: {
    width: 65,
    height: 65,
    marginRight: 5,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
  },
  info: {
    fontSize: 12,
  },
  imgadd: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: 'serif',
    color: 'black',
  },
});
