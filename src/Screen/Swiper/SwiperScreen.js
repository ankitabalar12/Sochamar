import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { styles } from './styles'
import Swiper from 'react-native-swiper';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
const SwiperScreen = ({navigation}) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const onPressNext = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.state.index;
      const totalSlides = swiperRef.current.state.total;
  
      if (currentIndex === totalSlides - 1) {
        swiperRef.current.scrollBy(-currentIndex, true);
      } else {
        swiperRef.current.scrollBy(1);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Swiper
      loop={false}
       dot={<View style={styles.dotStyle} />}
        activeDot={<View style={styles.activeDotStyle} />}
        paginationStyle={{height:"5%" , marginRight:'60%' }}
        style={styles.buttonWrapperStyle}
        ref={(ref) => {
          swiperRef.current = ref;
        }}
        // showsPagination={false}
      >
        
        <View style={styles.slide}>
            <Image source={icons.allmulti} style={[styles.multipe,{width:350,height:350}]} />
            <Text style={styles.Multipletext}>{String.Multiple}</Text>
            <Text style={styles.ouravaitext}>{String.ouravai}</Text>
            <TouchableOpacity onPress={onPressNext} style={styles.buttonview}>
            <Image source={icons.rightarrowtwo} style={styles.rightarrowtwo} />
            </TouchableOpacity>
        </View>
        <View style={styles.slide}>
            <Image source={icons.bookingnow} style={[styles.multipe,{width:350,height:300}]} />
            <Text style={[styles.Multipletext,styles.Multipletext2]}>{String.Bookyour}</Text>
            <Text style={[styles.ouravaitext,styles.ouravaitext2]}>{String.Wexxzc}</Text>
            <TouchableOpacity onPress={onPressNext} style={styles.buttonview}>
            <Image source={icons.rightarrowtwo} style={styles.rightarrowtwo} />
            </TouchableOpacity>
        </View>
        <View style={styles.slide}>
            <Image source={icons.offer} style={[styles.multipe,{width:350,height:350}]} />
            <Text style={styles.Multipletext}>{String.Atyour}</Text>
            <Text style={styles.ouravaitext}>{String.Yes}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.buttonview}>
            <Image source={icons.rightarrowtwo} style={styles.rightarrowtwo} />
            </TouchableOpacity>
        </View>
      </Swiper>

    </View>
  )
}

export default SwiperScreen

