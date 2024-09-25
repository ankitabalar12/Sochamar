import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Buttoncomponets = ({title,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
         <View style={styles.container}>
     <Text style={styles.textstyle}>{title}</Text>
    </View>
    </TouchableOpacity>
   
  )
}


const styles = StyleSheet.create({
    container:{
        height:45, 
        width:"55%",
        backgroundColor:"#c59619",
        justifyContent:'center',
        alignItems:"center",
        alignSelf:"center",
         borderRadius:50,
         marginTop:'10%'
        
    },
    textstyle:{
        fontSize:15,
        fontFamily: 'Poppins-SemiBold',
        color:'#fff'
    }
})
export default Buttoncomponets;