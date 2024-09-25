import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { icons } from '../../Helper/icons'
import { useNavigation } from '@react-navigation/native';

const BackArrow = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
      navigation.goBack();
    };
  return (
    <View style={styles.container}>
        <TouchableOpacity  onPress={handleBackPress}>
        <Image source={icons.back} style={styles.backArrow} />
        </TouchableOpacity>
</View>
  )
}

export default BackArrow

const styles = StyleSheet.create({
    container:{
        // height:30,
        //  width:30, 
        //  tintColor:"#c59619"
    },
    backArrow:{
        height:20,
        width:20, 
        tintColor:"#c59619" , marginTop:'10%', marginLeft:"6%"   
    }
})