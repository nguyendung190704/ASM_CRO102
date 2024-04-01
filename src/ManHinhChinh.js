import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const ManHinhChinh = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const route = useRoute();
  const {name, id, email, username, password, phone, avatar, address} =
    route.params;
  const [danhSach, setDanhSach] = useState([]);
  const [search, setSearch] = useState('');

  const filterProductsByCategory = category => {
    setSelectedCategory(category);
  };

  const formatPrice = price => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://65bb0eedb4d53c066553ecc1.mockapi.io/danhSach',
      );
      await axios.get('https://65bb0eedb4d53c066553ecc1.mockapi.io/gioHang');
      setDanhSach(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      console.error('Error details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterProductsByName = (item) => {
    if (!search) {
      return true;
    }
    const productName = item.tenSP.toLowerCase();
    const searchTerm = search.toLowerCase();
    return productName.includes(searchTerm);
  };

  return (
    <View>
      <ImageBackground
        source={{
          uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
        }}>
        <View style={styles.container}>
          <ImageBackground
            style={{
              width: 360,
              height: 140,
              flexDirection: 'column',
            }}
            source={{
              uri: 'https://capherangxay.vn/wp-content/uploads/2019/01/nhung-luu-y-de-mo-quan-cafe-nguyen-chat-2.jpg',
            }}>
            <View
              style={{
                borderRadius: 25,
                borderColor: 'white',
                borderWidth: 1,
                height: 40,
                margin: 30,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                marginBottom: 25,
                marginTop: 50,
                color: 'white',
                flexDirection:'row'
              }}>
              <TextInput
                style={{
                  color: 'white',width:260,height:40,
                }}
                placeholder='Tìm kiếm sản phẩm ...'
                placeholderTextColor='white' 
                onChangeText={(text) => setSearch(text)} 
                />
              <Image
              style={{width:40,height:40}}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg/1200px-VisualEditor_-_Icon_-_Search-big_-_white.svg.png',
              }}
            />
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                height: 25,
                alignItems: 'center',
                width: 360,
              }}>
              <ScrollView horizontal={true}>
                <TouchableOpacity
                  onPress={() => filterProductsByCategory(null)}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '300',
                      marginLeft: 20,
                    }}>
                    Tất cả
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => filterProductsByCategory('hat')}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '300',
                      marginLeft: 20,
                    }}>
                    Cà phê hạt
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => filterProductsByCategory('say')}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '300',
                      marginLeft: 20,
                    }}>
                    Cà phê xay
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => filterProductsByCategory('cfvn')}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '300',
                      marginLeft: 20,
                    }}>
                    Cà phê trong nước
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => filterProductsByCategory('cfnn')}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '300',
                      marginLeft: 20,
                    }}>
                    Cà phê nước ngoài
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ImageBackground>
          <ImageBackground
            style={{
              width: 360,
              height: 50,
              borderTopRightRadius: 20,
              opacity: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={{
              uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
            }}>
            <Text style={styles.title}>Danh sách các sản phẩm</Text>
          </ImageBackground>
          <FlatList
            data={danhSach.filter(item => {
              if (selectedCategory === null) {
                return filterProductsByName(item);
              } else if (selectedCategory === 'hat') {
                return item.loaiSP === 'hat' && filterProductsByName(item);
              } else if (selectedCategory === 'say') {
                return item.loaiSP === 'say' && filterProductsByName(item);
              } else if (selectedCategory === 'cfvn') {
                return item.xuatXu === 'cfvn' && filterProductsByName(item);
              } else if (selectedCategory === 'cfnn') {
                return item.xuatXu === 'cfnn' && filterProductsByName(item);
              }
            })}
            style={{height: 389}}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.productItem}>
                <ImageBackground
                  style={{
                    width: 340,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: 220,
                    overflow: 'hidden',
                    alignItems: 'flex-end',
                  }}
                  source={{uri: item.linkAnh}}></ImageBackground>
                <View style={styles.ngang}>
                  <View style={{width: 260, marginLeft: 5}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'cursive',
                          fontSize: 24,
                          width: 180,
                        }}>
                        {item.tenSP}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          fontFamily: 'cursive',
                        }}>
                        {formatPrice(item.giaSP)}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'cursive',
                        fontSize: 18,
                      }}>
                      Quantity : {item.soluong}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'cursive',
                        fontSize: 18,
                      }}>
                      Evaluate : {item.danhGia} ⭐
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.buttonadd}
                    onPress={() =>
                      navigation.navigate('SanPham', {product: item})
                    }>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{
                        uri: 'https://icons.iconarchive.com/icons/iconsmind/outline/512/Add-Cart-icon.png',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
            style={{width: 80, alignItems: 'center', opacity: 1}}>
            <Image
              style={styles.imgadd}
              source={{
                uri: 'https://i.pinimg.com/originals/0c/02/ce/0c02ce4850d6b88d44f87271ff5f4a71.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 80, alignItems: 'center', opacity: 0.7}}
            onPress={() =>
              navigation.navigate('GioHang', {
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

export default ManHinhChinh;

const styles = StyleSheet.create({
  container: {},
  title: {
    marginTop: 0,
    fontSize: 20,
    fontFamily: 'serif',
    color: 'black',
  },
  productItem: {
    borderWidth: 1,
    marginLeft: 10,
    width: 342,
    height: 300,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
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
    marginTop: 1,
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderBottomRightRadius: 10,
    width: 75,
    height: 77,
    alignItems: 'center',
  },
  ngang: {
    flexDirection: 'row',
  },
  imgadd: {
    width: 30,
    height: 30,
  },
});
