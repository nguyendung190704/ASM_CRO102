import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GioHang = () => {
  const navigation = useNavigation();
  const [gioHang, setGioHang] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false); 
  const route = useRoute();
  const {name, id, email, username, password, phone, avatar, address} =
    route.params;

  const handleRefresh = () => {
    setRefreshing(true); 
    fetchData(); 
    setRefreshing(false); 
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://65bb0eedb4d53c066553ecc1.mockapi.io/gioHang',
      );
      const filteredData = response.data.filter(item => item.idUser === userId);
      setGioHang(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const addItemToPaidList = async item => {
    try {
      const idUser = await AsyncStorage.getItem('userId');
      await axios.post(
        'https://65bb276752189914b5bb52a6.mockapi.io/dathanhtoan',
        {
          tenSP: item.tenSP,
          giaSP: item.giaSP,
          soLuong: item.soLuong,
          danhGia: item.danhGia,
          avatar: item.linkAnh,
          idUser: idUser,
          thoiGianThanhToan: new Date().toISOString(),
        },
      );
      removeItemFromCart(item.id);
      console.log('Item added to paid list successfully');
      Alert.alert('Thanh toán thành công');
      fetchData();
    } catch (error) {
      console.error('Error adding item to paid list:', error.message);
    }
  };

  const removeItemFromCart = async id => {
    try {
      await axios.delete(
        `https://65bb0eedb4d53c066553ecc1.mockapi.io/gioHang/${id}`,
      );
      fetchData();
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
        console.log('gọi iduser thành công ', id); 
      } catch (error) {
        console.error('Error retrieving user id:', error);
      }
    };
    getUserId();
  }, []);

  const formatPrice = price => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  const renderListItem = ({item}) => (
    <View style={styles.productItem}>
      <Image style={styles.img} source={{uri: item.linkAnh}} />
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
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'cursive',
                  fontSize: 15,
                  marginTop: 2,
                }}>
                Evaluate : {item.danhGia} ⭐{' '}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttondn}
              onPress={() => {
                addItemToPaidList(item);
              }}>
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#FF4500',
                borderRadius: 15,
                justifyContent: 'center',
                marginTop: 8,
                alignItems: 'center',
                marginLeft: 5,
              }}
              onPress={() => setShowModal(true)}>
              <Image
                style={{width: 20, height: 20}}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3405/3405244.png',
                }}
              />
              <Modal
                visible={showModal}
                transparent={true}
                onRequestClose={closeModal}>
                <View
                  style={{
                    width: 360,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    height: 660,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFCC99',
                      padding: 20,
                      width: 330,
                      height: 150,
                      opacity: 0.95,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'black', opacity: 1, fontSize: 20}}>
                      Bạn muốn xóa sản phẩm khỏi giỏ hàng không ?
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 20,
                      }}>
                      <TouchableOpacity onPress={closeModal}>
                        <Text
                          style={{
                            marginRight: 20,
                            color: 'black',
                            fontSize: 15,
                          }}>
                          KHÔNG
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>{removeItemFromCart(item.id)}}>
                        <Text
                          style={{
                            marginLeft: 20,
                            color: 'black',
                            fontSize: 15,
                          }}>
                          CÓ
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <ImageBackground
        style={{height: 580}}
        source={{
          uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
        }}>
        <View style={styles.container}>
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
            <Text style={styles.title}>Giỏ hàng</Text>
          </ImageBackground>
          <FlatList
            data={gioHang.filter(item => item.idUser === userId)}
            keyExtractor={item => item.id.toString()}
            renderItem={renderListItem}
            onRefresh={handleRefresh} 
            refreshing={refreshing} 
          />
        </View>
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
            onPress={() =>
              navigation.navigate('ManHinhChinh', {
                name,
                id,
                email,
                username,
                password,
                phone,
                avatar,
                address,
              })
            }>
            <Image
              style={styles.imgadd}
              source={{
                uri: 'https://i.pinimg.com/originals/0c/02/ce/0c02ce4850d6b88d44f87271ff5f4a71.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center', opacity: 1}}>
            <Image
              style={styles.imgadd}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/60/60992.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center', opacity: 0.7}}
            onPress={() =>
              navigation.navigate('LichSuThanhToan', {
                name,
                id,
                email,
                username,
                password,
                phone,
                avatar,
                address,
              })
            }>
            <Image
              style={styles.imgadd}
              source={{
                uri: 'https://www.pngkey.com/png/full/394-3944032_bell-notification-noice-ring-message-alert-comments-font.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center', opacity: 0.7}}
            onPress={() =>
              navigation.navigate('ThongTin', {
                name,
                id,
                email,
                username,
                password,
                phone,
                avatar,
                address,
              })
            }>
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

export default GioHang;

const styles = StyleSheet.create({
  container: {
    height: 580,
  },
  buttondn: {
    width: 60,
    height: 30,
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 8,
    marginLeft: 65,
  },
  title: {
    fontSize: 20,
    fontFamily: 'serif',
    color: 'black',
  },
  productItem: {
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 10,
    width: 340,
    height: 67,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: '#222222',
    borderBottomColor: 'black',
  },
  buttonls: {
    width: 340,
    height: 40,
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    justifyContent: 'center',
    margin: 10,
  },
  img: {
    width: 65,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 65,
    marginBottom: 10,
  },
  buttonadd: {
    backgroundColor: 'orange',
    borderRadius: 20,
    width: 30,
    marginTop: 30,
    height: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  ngang: {
    flexDirection: 'row',
  },
  imgadd: {
    width: 30,
    height: 30,
  },
});
