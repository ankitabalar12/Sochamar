import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../../Helper/icons'
import { useNavigation } from '@react-navigation/native';

const HeaderComponets = ({ title ,IconName}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
    <TouchableOpacity 
       onPress={handleBackPress}
     style={styles.backButton}>
      <Image source={IconName} style={styles.backArrow} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    backgroundColor: '#21242b',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#16181d",
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  backArrow: {
    height: 15,
    width: 15,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
})
export default HeaderComponets;