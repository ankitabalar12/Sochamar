import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { icons } from '../../Helper/icons'

const Searchcomponts = ({onPress,value}) => {
  return (
    <View style={styles.mainview}>
    <View style={styles.flexrow}>
      <TouchableOpacity style={styles.margin}>
      <Image source={icons.search} style={styles.search} />
      </TouchableOpacity>
      <TextInput
              placeholder="Search Services"
              placeholderTextColor={'#808080'}
              onChangeText={onPress} 
              value={value}
              style={styles.input}
              />
    </View>
    
    </View>
  )
}

export default Searchcomponts

const styles = StyleSheet.create({
    mainview:{
        height:50, 
        width:'90%',
         backgroundColor:"#000",
          alignSelf:"center", 
          marginTop:"3%",
           borderRadius:50, justifyContent:'center'
    },
    flexrow:{
      flexDirection:'row'
    },
    search:{
height:20, width:20, tintColor:'#8c8c8c',  marginLeft:'5%'
    },
    margin:{
      marginLeft:'5%', justifyContent:'center'
    },
    input:{
      color:'#fff'
    }
})