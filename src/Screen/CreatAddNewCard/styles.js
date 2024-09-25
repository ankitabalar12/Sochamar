import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        backgroundColor: '#21242b',
    flex: 1,
    },
    cardname:{
        color:'#bfbfbf',
        fontFamily: 'Poppins-SemiBold',
        fontSize:15, marginLeft:'9%', marginTop:"2%"

    },
    matop:{
marginTop:"5%"
    },
    mainview:{
        height:50,
        width:'85%', 
        borderRadius:50,
        alignSelf:'center',
        backgroundColor: "#fff",
       shadowOffset: {
         width: 0,
         height: 1,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5, // This is for Android
       marginTop:'1%', justifyContent:'center'   
    },
    textslec:{
        marginLeft:"3%",
    },
    mainview2:{
        marginTop:'10%'
    },
    twoboxview:{
        flexDirection:'row', justifyContent:'space-between', marginHorizontal:'10%', marginTop:"5%"
    },
    textboxview:{
        height:50, width:150, 
         backgroundColor: "#fff",
        marginTop:'5%', borderRadius:50, justifyContent:"center", paddingLeft:12
    },
    Exprired:{
        color:'#bfbfbf',
        fontFamily: 'Poppins-SemiBold',
        fontSize:15, 
         marginTop:"5%",
    },
    CVV:{
        color:'#bfbfbf',
        fontFamily: 'Poppins-SemiBold',
        fontSize:15,  marginTop:"5%" ,
       
    },
    confirmpayscreenbutton: {
        borderRadius: 100, marginTop: "15%", width: "85%",
      },
      selectedDate2:{
        color:'#000'
      }
})