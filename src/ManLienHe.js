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
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const ManLienHe = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const questionsAndAnswers = [
    {
      question:
        'Tại sao cà phê được coi là một phần quan trọng của nền văn hóa?',
      answer:
        'Cà phê không chỉ là một thức uống mà còn là một phần của nhiều nền văn hóa trên khắp thế giới. Nó thường được sử dụng trong các sự kiện xã hội, gặp gỡ bạn bè và gia đình, và thậm chí là trong các nghi lễ tôn giáo. Điều này là do cà phê mang lại cảm giác sảng khoái và làm tăng sự tỉnh táo, giúp tạo ra một môi trường giao tiếp và chia sẻ đặc biệt.',
    },
    {
      question:
        'Quá trình rang cà phê ảnh hưởng như thế nào đến hương vị của nó?',
      answer:
        'Quá trình rang cà phê có thể ảnh hưởng đến hương vị của cà phê một cách đáng kể. Thời gian rang, nhiệt độ và phương pháp rang đều đóng vai trò quan trọng. Cà phê rang nhẹ thường có hương vị nhẹ nhàng, axit tự nhiên và thơm ngon hơn so với cà phê rang đậm.',
    },
    {
      question:
        'Các quốc gia nào sản xuất cà phê hàng đầu trên thế giới?',
      answer:
        'Brazil là quốc gia hàng đầu về sản xuất cà phê trên thế giới, với sản lượng lớn nhất và chất lượng cao. Các quốc gia khác như Colombia, Ethiopia và Việt Nam cũng là những nhà sản xuất cà phê hàng đầu.',
    },
    {
      question:
        'Tại sao cà phê thường được sử dụng làm thức uống vào buổi sáng?',
      answer:
        'Cà phê chứa caffeine, một chất kích thích giúp tăng cường sự tỉnh táo và tăng cường sự chú ý, làm cho nó trở thành lựa chọn phổ biến để bắt đầu ngày mới.  ',
    },
    {
      question:
        'Tại sao cà phê trở thành một phần không thể thiếu trong văn hóa của nhiều quốc gia?',
      answer:
        'Cà phê không chỉ là một thức uống mà còn là một phần của nhiều nền văn hóa trên khắp thế giới, thường được sử dụng trong các sự kiện xã hội, gặp gỡ bạn bè và gia đình, và thậm chí là trong các nghi lễ tôn giáo. Điều này là do cà phê mang lại cảm giác sảng khoái và làm tăng sự tỉnh táo, giúp tạo ra một môi trường giao tiếp và chia sẻ đặc biệt.',
    },
  ];
  const toggleAnswer = index => {
    const newShowAnswers = [...showAnswers];
    newShowAnswers[index] = !newShowAnswers[index];
    setShowAnswers(newShowAnswers);
  };
  const [showAnswers, setShowAnswers] = useState(
    Array(questionsAndAnswers.length).fill(false),
  );
  const renderQuestionItem = ({item, index}) => (
    <TouchableOpacity onPress={() => toggleAnswer(index)}>
      <View style={styles.questionItem}>
        <Text style={styles.questionText}>{item.question}</Text>
        {showAnswers[index] && (
          <Text style={styles.answerText}>{item.answer}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <ImageBackground
        style={{height: 576}}
        source={{
          uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg',
        }}>
        <FlatList
          data={questionsAndAnswers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderQuestionItem}
        />
      </ImageBackground>
    </View>
  );
};

export default ManLienHe;

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'serif',
    color: 'black',
  },
  questionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
    backgroundColor: '#F3C246',
  },
  questionText: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  answerText: {
    color: '#333',
  },
  buttondk: {
    width: 70,
    height: 30,
    backgroundColor: '#FF4500',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  imgadd: {
    width: 30,
    height: 30,
  },
});
