import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

const LongButton = ({title,onPress,stylebutton,confirmpayscreenbutton}) => {
  return (
    <TouchableOpacity onPress={onPress}>
         <View style={[styles.container,stylebutton,confirmpayscreenbutton]}>
     <Text style={styles.textstyle}>{title}</Text>
    </View>
    </TouchableOpacity>
  )
}

export default LongButton

const styles = StyleSheet.create({
    container:{
        height:45, 
        width:"90%",
        // backgroundColor:"#f8801b",
        backgroundColor:"#c59619",
        justifyContent:'center',
        alignItems:"center",
        alignSelf:"center",
        borderRadius: 10,
        //  marginTop:'15%'
        
    },
    textstyle:{
        fontSize:15,
        fontFamily: 'Poppins-SemiBold',
        color:'#fff'
    }
})