import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#21242b',
        flex: 1
    },
    flexrow: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        marginTop: '4%'
    },
    settings: {
        height: 20, width: 20, tintColor: "#c59619"
    },
    profileview:{
        height:50, width:50, borderRadius:50, backgroundColor:"#cccccc", justifyContent:'center'
    },
    profileview2:{
        height:50, width:50, borderRadius:50, alignSelf:"center"  
    },
    usernametxte:{
        color:'#fff',
         textAlign:"center", 
         marginTop:'1%',
         fontFamily: 'Poppins-SemiBold',
    },
    flexrow2:{
        flexDirection:"row", marginTop:"3%", marginHorizontal:'5%'
    },
    chatstext:{
        fontSize:25,
        fontFamily: 'Poppins-SemiBold',
        color:"#fff"
    },
    unbermsgview:{
        height:8, width:8, borderRadius:5, backgroundColor:'#c59619', marginTop:'4%', marginHorizontal:"2%"
    },
    twoundertext:{
        fontSize:14,
        color:"#c59619",
        marginTop:'2.5%'
    },
    flexrow3:{
        flexDirection:"row", marginHorizontal:"5%",
        marginTop:"5%"
    },
    profileother:{
        height:50, width:50,borderRadius:30, backgroundColor:"#999999", justifyContent:"center"

    },
    profileother2:{
        height:50, width:50,borderRadius:30, alignSelf:"center"  
    },
    Celinetext:{
        color:"#fff",
        fontFamily: 'Poppins-SemiBold',
        fontSize:14,
        // marginLeft:"5%"
    },
    marleft:{
        marginLeft:"5%"
    },
    Risetext:{
        color:'#fff', marginRight:"25%"
    },
    timetext:{
        position:"absolute", right:0, color:'#fff', marginTop:"1%"
    },
    flexrow4:{
       flexDirection:'row'
    },
    msgunder:{
        height:20,
         width:20,
         borderRadius:20, 
        backgroundColor:"#c59619", 
        position:"absolute",
         right:30,
         justifyContent:'center'
    },
    msgnumber:{
        color:"#fff",
        alignSelf:"center",
        fontFamily: 'Poppins-SemiBold',
    },
    viewstyle:{
        height:1, 
        width:'95%',
         backgroundColor:"#595959",
        marginTop:"5%",
         marginBottom:"2%", alignSelf:"center"
    },
    msgunder2:{
        right:45
    },
    marbottom:{
        marginBottom:"50%"
    },

    profileImage: {
         width: 300,
        height:300,
        resizeMode: 'cover',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      modalImage: {
        width: 300,
        height: 300,
        borderRadius:150,
        resizeMode: 'contain',
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
      },
      closeText: {
        color: 'white',
        fontSize: 16,
      },
      roundimges:{
        height:150, width:150, borderRadius:150
      }
})