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
import {TextInput} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const SanPham = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;
  const [showModal, setShowModal] = useState(false);
  const [danhSach, setDanhSach] = useState([]);
  const [gioHang, setGioHang] = useState([]);


  const closeModal = () => {
    setShowModal(false);
  };
  const formatPrice = price => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://65bb0eedb4d53c066553ecc1.mockapi.io/danhSach',
      );
      setDanhSach(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      console.error('Error details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = async () => {
    try {
      const idUser = await getUserId(); 
      if (idUser) {
        const response = await axios.post(
          'https://65bb0eedb4d53c066553ecc1.mockapi.io/gioHang',
          {
            tenSP: product.tenSP,
            giaSP: product.giaSP,
            soLuong: quantity,
            danhGia: product.danhGia,
            linkAnh: product.linkAnh,
            idUser: idUser,
          },
        );
        Alert.alert('Thêm vào giỏ hàng thành công');
        console.log('Sản phẩm đã được thêm vào giỏ hàng:', response.data);
        fetchData(); 
      } else {
        console.log('Không thể thêm sản phẩm vào giỏ hàng vì không có IdUser.');
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error.message);
    }
  };
  
  
  
  
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId !== null) {
        return userId;
      } else {
        console.log('Không tìm thấy IdUser trong AsyncStorage.');
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi lấy IdUser từ AsyncStorage:', error);
      return null;
    }
  };
  

  return (
    <ImageBackground
      source={{
        uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
      }}>
      <View style={{height: 560}}>
        <View>
          <View style={styles.productItem}>
            <ImageBackground
              style={{
                width: 360,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: 300,
                overflow: 'hidden',
                marginBottom: 10,
              }}
              source={{
                uri: product.linkAnh,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  marginTop: 232,
                  borderTopRightRadius: 1,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'cursive',
                      fontSize: 30,
                      width: 240,
                      marginLeft: 5,
                    }}>
                    {product.tenSP}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'cursive',
                      marginTop: 5,
                      fontWeight: '900',
                    }}>
                    {formatPrice(product.giaSP)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'cursive',
                    fontSize: 20,
                    marginTop: 2,
                    marginBottom: 5,
                    marginLeft: 10,
                    fontWeight: '900',
                  }}>
                  {product.danhGia} ⭐{' '}
                </Text>
              </View>
            </ImageBackground>
            <View style={{}}>
              <View style={{width: 360, marginLeft: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    marginTop: 2,
                    fontWeight: '900',
                  }}>
                  Mô tả sản phẩm :{' '}
                </Text>
                <ScrollView
                  style={{height: 155, width: 355}}
                  nestedScrollEnabled={true}>
                  <Text style={{color: 'gray', fontSize: 13}}>
                    {product.mota}
                  </Text>
                </ScrollView>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      marginTop: 8,
                      width: 160,
                    }}>
                    Số lượng :{' '}
                  </Text>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: '500',
                      fontSize: 17,
                      marginTop: 7,
                    }}>
                    Tổng tiền : {formatPrice(product.giaSP * quantity)}{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#FF6600',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        marginRight: 10,
                      }}
                      onPress={handleDecrement}>
                      <Image
                        style={{width: 15, height: 20}}
                        source={{
                          uri: 'https://cdn-icons-png.freepik.com/512/56/56889.png',
                        }}
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={{
                        height: 30,
                        width: 100,
                        color: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 15,
                        alignItems: 'center',
                        padding: 0,
                      }}
                      value={quantity.toString()}
                      keyboardType="numeric"
                      textAlign="center"
                      onChangeText={text => setQuantity(parseInt(text) || 0)}
                    />
                    <TouchableOpacity
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#FF6600',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        marginLeft: 10,
                      }}
                      onPress={handleIncrement}>
                      <Image
                        style={{width: 17, height: 17}}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/32/32339.png',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 100,
                      height: 30,
                      backgroundColor: '#FFCC33',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginLeft: 90,
                      marginTop: 5,
                    }}
                    onPress={addToCart}>
                    <Text style={{fontFamily: 'bold', color: 'black'}}>
                      Thêm vào giỏ{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      
    </ImageBackground>
  );
};

export default SanPham;

const styles = StyleSheet.create({
  container: {},
  title: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'serif',
    color: 'black',
  },
  productItem: {
    borderWidth: 1,
    width: 360,
    height: 560,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#222222',
    borderBottomColor: 'black',
  },
  img: {
    width: 147,
    borderRadius: 10,
    height: 140,
    marginBottom: 10,
  },
  buttonadd: {
    backgroundColor: 'orange',
    borderRadius: 20,
    marginTop: 5,
    width: 30,
    height: 30,
  },
  ngang: {
    flexDirection: 'row',
  },
  imgadd: {
    width: 30,
    height: 30,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 40,
    textAlign: 'center',
  },

  quantityButton: {
    backgroundColor: '#FFCC33',
    borderRadius: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
