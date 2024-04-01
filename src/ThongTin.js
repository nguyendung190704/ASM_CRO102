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
  TextInput,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';

const ThongTin = () => {
  const route = useRoute();
  const {name, id, email, username, password, phone, avatar, address} =
    route.params;
  const [showModal, setShowModal] = useState(false);
  const [showModalUp, setShowModalUp] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [newAddress, setNewAddress] = useState(address);
  const [newAvatar, setNewAvatar] = useState('');
  const navigation = useNavigation();
  const [defaultName, setDefaultName] = useState('');
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultPhone, setDefaultPhone] = useState('');
  const [defaultAddress, setDefaultAddress] = useState('');
  const [defaultAvatar, setDefaultAvatar] = useState('');
  useEffect(() => {
    setDefaultName(name);
    setDefaultEmail(email);
    setDefaultPhone(phone);
    setDefaultAddress(address);
    setDefaultAvatar(avatar);
  }, [name, email, phone, address, avatar]);
  const closeModal = () => {
    setShowModal(false);
  };
  const closeModalUp = () => {
    setShowModalUp(false);
  };
  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      cropperStatusBarColor: 'black',
      cropperToolbarColor: 'black',
      cropperToolbarWidgetColor: 'white',
      cropperActiveWidgetColor: 'white',
    })
      .then(image => {
        setNewAvatar(image.path);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };
  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const validatePhoneNumber = phone => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const updateUser = async () => {
    try {
      if (newName.length <= 6 && newName !== name) { 
        Alert.alert('Vui lòng nhập tên dài hơn 6 kí tự');
        return;
      }
      if (!validateEmail(newEmail) && newEmail !== email) {
        Alert.alert('Vui lòng nhập đúng định dạng email');
        return;
      }
      if (!validatePhoneNumber(newPhone) && newPhone !== phone) { 
        Alert.alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số)');
        return;
      }
      if (newAddress.length <= 6 && newAddress !== address) { 
        Alert.alert('Vui lòng nhập địa điểm dài hơn 6 kí tự');
        return;
      }
      const response = await axios.put(
        `https://65bb276752189914b5bb52a6.mockapi.io/nguoidung/${id}`,
        {
          name: newName || name,
          email: newEmail || email,
          phone: newPhone || phone,
          address: newAddress || address,
          avatar: newAvatar || avatar,
        },
      );
  
      navigation.replace('ThongTin', {
        name: newName || name,
        id,
        email: newEmail || email,
        username,
        password,
        phone: newPhone || phone,
        avatar: newAvatar || avatar,
        address: newAddress || address,
      });
      Alert.alert('Chỉnh sửa thông tin thành công ');
    } catch (error) {
      console.error('Error updating user info:', error.message);
    }
  };
  

  return (
    <View>
      <ImageBackground
        style={{height: 576}}
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
          <Text style={styles.title}>Thông tin cá nhân</Text>
        </ImageBackground>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Image
            style={{width: 70, height: 70, marginLeft: 10, borderRadius: 70}}
            source={{
              uri: newAvatar || avatar,
            }}
          />
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{color: 'black', fontSize: 15}}>Fullname: {name}</Text>
            <Text style={{fontSize: 12}}>Email: {email}</Text>
            <Text style={{fontSize: 12}}>Phone: {phone}</Text>
          </View>
        </View>
        <Text style={{marginTop: 30, marginLeft: 10, fontSize: 13}}>Chung</Text>
        <Text
          style={{
            backgroundColor: '#777777',
            height: 1,
            width: 340,
            marginLeft: 10,
          }}></Text>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: 'black',
            fontWeight: '600',
            fontSize: 15,
          }}
          onPress={() => setShowModalUp(true)}>
          Chỉnh sửa thông tin cá nhân
        </Text>
        <Modal
          visible={showModalUp}
          transparent={true}
          onRequestClose={closeModalUp}>
          <View
            style={{
              width: 360,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              height: 620,
            }}>
            <View
              style={{
                backgroundColor: '#FFCC99',
                padding: 20,
                width: 330,
                height: 550,
                opacity: 0.95,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                }}
                source={{uri: newAvatar || avatar}}
              />
              <TouchableOpacity
                style={{
                  width: 160,
                  height: 30,
                  backgroundColor: '#FFCC66',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}
                onPress={openImagePicker}>
                <Text style={{color: 'black', fontSize: 15}}>
                  Thay đổi avatar
                </Text>
              </TouchableOpacity>
              <Text style={styles.pw}>Name</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setNewName(text)}>
                {name}
              </TextInput>
              <Text style={styles.pw}>Email</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setNewEmail(text)}>
                {email}
              </TextInput>
              <Text style={styles.pw}>Phone</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setNewPhone(text)}>
                {phone}
              </TextInput>
              <Text style={styles.pw}>Address</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setNewAddress(text)}>
                {address}
              </TextInput>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttondk}
                  onPress={closeModalUp}>
                  <Text style={styles.buttonText}>Thoát</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttondn} onPress={updateUser}>
                  <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: 'black',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Cẩm nang cà phê
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: 'black',
            fontWeight: '600',
            fontSize: 15,
          }}
          onPress={() =>
            navigation.navigate('LichSuThanhToan', {
              name,
              email,
              username,
              password,
              phone,
              avatar,
              address,
            })
          }>
          Lịch sử giao dịch
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: 'black',
            fontWeight: '600',
            fontSize: 15,
          }}
          onPress={() =>
            navigation.navigate('ManLienHe', {
              name,
              email,
              username,
              password,
              phone,
              avatar,
              address,
            })
          }>
          Q & A
        </Text>

        <Text style={{marginTop: 30, marginLeft: 10, fontSize: 13}}>
          Bảo mật và Điều khoản
        </Text>
        <Text
          style={{
            backgroundColor: '#777777',
            height: 1,
            width: 340,
            marginLeft: 10,
          }}></Text>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: 'black',
            fontWeight: '600',
            fontSize: 15,
          }}
          onPress={() =>
            navigation.navigate('GioiThieu', {
              name,
              email,
              username,
              password,
              phone,
              avatar,
              address,
            })
          }>
          Giới thiệu
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: 'black',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Điều khoản và điều kiện
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: 'black',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Chính sách quyền riêng tư
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: 'red',
            fontWeight: '600',
            fontSize: 15,
          }}
          onPress={() => setShowModal(true)}>
          Đăng xuất
        </Text>
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
                Bạn muốn đăng xuất không ?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                }}>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={{marginRight: 20, color: 'black', fontSize: 15}}>
                    KHÔNG
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DangNhap')}>
                  <Text style={{marginLeft: 20, color: 'black', fontSize: 15}}>
                    CÓ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
            style={{width: 80, alignItems: 'center', opacity: 1}}>
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

export default ThongTin;

const styles = StyleSheet.create({
  imgadd: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: 'serif',
    color: 'black',
  },
  pw: {
    marginTop: 5,
    marginRight: 220,
    width: 70,
  },
  textInput: {
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    width: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
  },
  buttondn: {
    width: 130,
    height: 40,
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  buttondk: {
    width: 130,
    height: 40,
    backgroundColor: '#FF4500',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
