import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../../Helper/icons'
import { useNavigation } from '@react-navigation/native';

const Headerviewbackarrow = ({ title }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
       <View style={styles.flexrow}>
       <TouchableOpacity 
       onPress={handleBackPress}
      style={styles.backButton}>
        <View style={styles.viewimg}>
        <Image source={icons.back} style={styles.backArrow} />
        </View>
    
    </TouchableOpacity></View> 
    <Text style={styles.title}>{title}</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: '#21242b',
    // justifyContent: 'center',
    flexDirection:"row",
    // alignItems: 'center',
    borderColor: "#16181d",
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
  },
  flexrow:{
  flexDirection:"row",
   marginLeft:'2%',
    marginTop:'5%'
  },
  backButton: {
   
    // left: 16,
    // flexDirection:'row'
  },
  backArrow: {
    height: 15,
    width: 15,
    tintColor: '#fff',
    alignSelf:'center'
  },
  title: {
    color: '#737373',
    fontSize: 19,
    fontFamily: 'Poppins-SemiBold',
    
    marginTop:'6.5%'
    // textAlign: 'center',
  },
  viewimg:{
    height:40,
     width:40, 
    //  backgroundColor:'#808080',
     borderRadius:50, 
     justifyContent:'center', 
  }
})
export default Headerviewbackarrow;