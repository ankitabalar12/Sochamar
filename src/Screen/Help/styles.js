import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#21242b',
        flex: 1
    },
    flexrow: {
        flexDirection: 'row', justifyContent: "space-between", marginTop: "5%", marginHorizontal: "10%"
    },
    woman: {
        height: 40,
        width: 40,
        alignSelf: "center",
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 20,
    },
    viewstyle: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#fff',
        borderWidth: 2,
        justifyContent: 'center'
    },
    notification: {
        height: 30,
        width: 30,
        tintColor: '#6a6e6b',
    },
    viewstyle2:{
        height: 70,
    width: '100%',
    backgroundColor: '#1a1915',
    // justifyContent: 'center',
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
    ewlcom:{
        fontSize:17, color:'#a6a6a6', marginTop:'3%', marginLeft:'9%'
    },
    Howcan:{
        fontSize:20,
        fontFamily: 'Poppins-SemiBold',
        color:"#fff", marginTop:'10%', alignSelf:'center'
    },
    flexrow1:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginHorizontal:"13%", marginTop:'5%'
    },
    manview:{
        height:140,
         width:"45%",
        backgroundColor: "#3b3b3b",
         borderRadius:10, 
         justifyContent:'center', alignItems:'center'
    },
    manview2:{
        height:140,
        width:"35%",
       backgroundColor: "#3b3b3b",
        borderRadius:10, 
        justifyContent:'center', alignItems:'center', marginTop:'5%', alignSelf:'center'
    },
    witheview:{
        height:70,
         width:'50%',
         backgroundColor:"#fff",
         justifyContent:'center',
         alignItems:"center"
    },
    sweet:{
        fontSize:15, color:'#fff', marginTop:'3%'
    },
    gallry3:{
        height:30, width:40, tintColor:'#3b3b3b'
    },
    noimagefound:{
        fontSize:10, color:'#8c8c8c', textAlign:'center'
    },
    verifyline: {
        height: 10, width: '75%', backgroundColor: "#272524", borderColor: '#fff', borderWidth: 1, marginTop: '10%', alignSelf: "center", justifyContent: 'center'
    },
    veryview: {
        height: 10, width: '2%', backgroundColor: "#fff",
    },
    flexrow7: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: "25%"
    }, veryview2: {
        backgroundColor: '#c59619'
    },
    varify: {
        height: 7,
        width: '15%',
        backgroundColor: "#272524",
        // borderEndColor:'#fff',
        borderRightColor: '#fff',
        borderRightWidth: 5,
      
        marginTop: '5%',
        alignSelf:"center",
        //   justifyContent:'center'
    },
})