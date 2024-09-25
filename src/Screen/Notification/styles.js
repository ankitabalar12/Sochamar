import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#21242b',
        flex: 1, 
    },
    notiview:{
        height:50,
         width:50,
         backgroundColor:"#bfbfbf",
         borderRadius:50, 
        justifyContent:'center', 
        alignSelf:'center', 
        marginTop:"50%"
    },
    found:{
        height:20, width:30,tintColor:'#000',alignSelf:"center"
    },
    foundtext:{
        color: '#737373',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign:"center", marginTop:"5%"
    },
    todaytext:{
        color:'#fff',
         fontSize:19,
        fontFamily: 'Poppins-SemiBold',
        marginLeft:"5%", marginTop:'2%'

      },
      notflexrow:{
        flexDirection:'row'
      },
      notiproflview:{
       marginLeft:'5%', marginTop:"2%", 
      },
      notiproflview2:{
        height:45,
         width:45,
         borderRadius:45,
         backgroundColor:"#f3d261",
         justifyContent:'center'
        
      },
      textstyleyou:{
        color:'#fff',
        fontFamily: 'Poppins-SemiBold',
        marginTop:'2%', 
        marginLeft:'12%'
      },
      textstyleyou2:{
        color:'#fff',
        // fontFamily: 'Poppins-SemiBold',
        marginTop:'2%', marginLeft:'1%'
      },
      notrowtwo:{
        flexDirection:'row'
      },
      turnright:{
        height:20, width:20,
        marginLeft:'12%',
        tintColor:'#fff'
      },
      dfsd:{
        color:'#fff', marginLeft:'1%', fontSize:20 , 
      },
      textstyleyou3:{
        position:"absolute",
         right:-60,
         color:'#fff', 
         marginTop:'2%',
        //  fontFamily: 'Poppins-SemiBold',
    },
    marginview:{
        height:1,
         width:'90%',
         backgroundColor:'#404040',
         alignSelf:'center',
         marginTop:"5%", marginBottom:"5%"
    },
    image:{
        height:25, width:25, alignSelf:'center'
    },
    notflexrow2:{
        backgroundColor:'#3ebdf0'
    },
    notflexrow3:{
        backgroundColor:'#faa5a8'  
    },
    margierewdf:{
        marginBottom:'50%'
    }
})