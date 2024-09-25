import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#21242b',
        flex: 1, 
    },
    freque:{
        color:'#fff',
        marginTop:'4%' ,
        marginLeft:'5%', 
        fontSize:15,
        fontFamily: 'Poppins-SemiBold',

    },
    freqflexrow:{
        flexDirection:"row", marginTop:"5%",
         marginLeft:'5%', marginRight:'5%'
    },
    fourbuttonview:{
        height:40,
         width:"25%",
         backgroundColor:"#6f7990", 
        borderRadius:25, 
         justifyContent:'center', margin:5
    },
    fourbuttonview2:{
        width:'20%'
    },
    buttontext:{
        color:'#fff',
        textAlign:"center"
    },
    fourbuttonview3:{
        width:"21%"
    },
    flexrowdfd:{
     flexDirection:"row"  ,
    justifyContent:'space-between', marginHorizontal:"8%", marginTop:"5%" 
    },
    rightarrow:{
        height:17, width:17, tintColor:'#fff', 
    },
    whattext:{
        color:'#b3b3b3',
        fontSize:15,
        fontFamily: 'Poppins-SemiBold',

    },
    margineview:{
        height:1,
         width:"85%",
         backgroundColor:'#fff',
         marginTop:"4%",
         marginBottom:"4%", alignSelf:"center"
    },
    whattext2:{
        marginHorizontal:"8%",
        color:'#b3b3b3',
        fontSize:15,
        fontFamily: 'Poppins-SemiBold',
        marginTop:'2%'
    }
})