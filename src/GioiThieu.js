import { StyleSheet, Text, View, ScrollView, ImageBackground, Image } from 'react-native'
import React from 'react'

const GioiThieu = () => {
  return (
    <ScrollView style={{ height: 780 }}>
      <ImageBackground
      style={{}}
        source={{ uri: 'https://image.slidesdocs.com/responsive-images/background/coffee-culture-illustration-powerpoint-background_e224109f77__960_540.jpg' }}
      >
        <Image
          style={{ width: 360, height: 140 }}
          source={{ uri: 'https://capherangxay.vn/wp-content/uploads/2019/01/nhung-luu-y-de-mo-quan-cafe-nguyen-chat-2.jpg' }} />
        <Text style={{fontSize:22,color:'black',marginLeft:10,fontWeight:'600'}}>Tại sao bạn chọn nên chúng tôi ?</Text>
        <Text style={{margin:10,fontSize:18,color:'black'}}>1. Đặt Hàng Nhanh Chóng và Dễ Dàng</Text>
        <Text style={{marginLeft:30,marginRight:10,color:'black'}}>- Chọn từ thực đơn đa dạng với các loại cà phê ngon từ khắp nơi trên thế giới.</Text>
        <Text style={{marginLeft:30,marginRight:10,marginTop:5,color:'black'}}>- Tùy chỉnh đơn hàng theo sở thích cá nhân: độ đậm, độ ngọt, loại sữa, và nhiều lựa chọn khác.</Text>
        <Text style={{margin:10,fontSize:18,color:'black'}}>2. Giao Hàng Nhanh Chóng và An Toàn</Text>
        <Text style={{marginLeft:30,marginRight:10,color:'black'}}>- Lựa chọn giao hàng tận nơi để tận hưởng cà phê ngon mọi lúc, mọi nơi.</Text>
        <Text style={{marginLeft:30,marginRight:10,marginTop:5,color:'black'}}>- Kiểm tra trạng thái đơn hàng và địa điểm giao hàng trực tuyến.</Text>
        <Text style={{margin:10,fontSize:18,color:'black'}}>3. Khám Phá Hương Vị Mới</Text>
        <Text style={{marginLeft:30,marginRight:10,color:'black'}}>- Thực đơn đa dạng với các loại cà phê chất lượng cao.</Text>
        <Text style={{marginLeft:30,marginRight:10,marginTop:5,color:'black'}}>- Hệ thống đánh giá và đánh giá giúp bạn chọn lựa tốt nhất.</Text>
        <Text style={{margin:10,fontSize:18,color:'black'}}>4. Trải Nghiệm Cà Phê Tận Hưởng</Text>
        <Text style={{marginLeft:30,marginRight:10,color:'black',marginBottom:20}}>- Thẻ quyền lợi VIP với những ưu đãi đặc quyền cho những người sử dụng tích điểm nhiều.</Text>
      </ImageBackground>

    </ScrollView>
  )
}

export default GioiThieu

const styles = StyleSheet.create({})