import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const DangKy = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [address, setAddress] = useState('');

  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordHidden(!isPasswordHidden);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordHidden(!isConfirmPasswordHidden);
  };

  const navigation = useNavigation();

  const handleRegistration = async () => {
    if (
      !name ||
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      !phone ||
      !address
    ) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (name.length < 6) {
      alert('Fullname phải chứa ít nhất 6 ký tự.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Email không hợp lệ.');
      return;
    }
    if (username.length < 6) {
      alert('username phải chứa ít nhất 6 ký tự.');
      return;
    }

    if (password.length < 6) {
      alert('Mật khẩu phải chứa ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Xác nhận mật khẩu không khớp.');
      return;
    }
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      Alert.alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số)');
      return;
    }

    const userData = {name, email, username, password, phone, avatar, address};

    try {
      const response = await axios.post(
        'https://65bb276752189914b5bb52a6.mockapi.io/nguoidung',
        userData,
      );
      console.log('Tài khoản mới là :', response.data);
      navigation.navigate('DangNhap');
      await axios.get('https://65bb276752189914b5bb52a6.mockapi.io/nguoidung');
    } catch (error) {
      console.error('Error registering user:', error.message);
      console.error('Error details:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.background}>
      <ImageBackground
        source={{
          uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
        }}>
        <View style={styles.logo}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/FPT_Polytechnic.png/1200px-FPT_Polytechnic.png',
            }}
          />
          <Text style={styles.cm}>Chào mừng bạn đã đến </Text>
        </View>
        <Text style={styles.pw}>Fullname</Text>
        <TextInput style={styles.textInput} onChangeText={setName} />
        <Text style={styles.pw}>Email</Text>
        <TextInput style={styles.textInput} onChangeText={setEmail} />
        <Text style={styles.pw}>Username</Text>
        <TextInput style={styles.textInput} onChangeText={setUsername} />
        <Text style={styles.pw}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={isPasswordHidden}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}>
            <Text>{isPasswordHidden ? 'Hiện ' : 'Ẩn'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.pw}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={isConfirmPasswordHidden}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={toggleConfirmPasswordVisibility}>
            <Text>{isConfirmPasswordHidden ? 'Hiện ' : 'Ẩn'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.pw}>Phone</Text>
        <TextInput style={styles.textInput} onChangeText={setPhone} />
        <Text style={styles.pw}>Address</Text>
        <TextInput style={styles.textInput} onChangeText={setAddress} />
        <Text style={styles.pw}>Avatar</Text>
        <TextInput style={styles.textInput} onChangeText={setAvatar} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttondn}
            onPress={handleRegistration}>
            <Text style={styles.buttonText}>Đăng Ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttondk}
            onPress={() => navigation.navigate('DangNhap')}>
            <Text style={styles.buttonText}>Trở về</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
  },
  logo: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
    marginLeft: 20,
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    height: 48,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  img: {
    width: 255,
    height: 87,
    marginBottom: 10,
  },
  cm: {
    fontSize: 20,
    color: '#1E90FF',
    fontFamily: 'Popins',
  },
  pw: {
    marginLeft: 20,
    marginTop: 10,
  },
  textInput: {
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    height: 48,
    width: 320,
    marginLeft: 20,
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

export default DangKy;
