import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
     backgroundColor: '#21242b',
        flex: 1, 
    },
    textlinr:{
        fontSize:15, 
        color:'#fff', marginTop:"5%", marginLeft:"6%"
    },
    marrow:{
   marginTop:'5%',
  marginLeft:'7%',
    },
    hellotex:{
        fontSize:15,
        color:'#fff', 
        // // marginTop:'5%',
        // marginLeft:'11%',
        fontFamily: 'Poppins-SemiBold',
    },
    flexrow:{
        flexDirection:'row', justifyContent:'space-between',marginTop:20
    },
    viewstyle: {
        height: 60,
        width: 60,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 2,
        justifyContent: 'center',
        marginRight:'10%', 
        marginTop:"5%"
    },
    woman:{
        height: 60,
        width: 60,
        backgroundColor: '#fff',
        borderRadius: 50,
        alignSelf:'center', 
    },
    sinupbutton:{
        height:40, 
        width:"100%",
        //  backgroundColor:"#f8801b", 
        backgroundColor:"#c59619",
        marginTop:"5%",
        justifyContent:'center',
        alignItems:'center',borderRadius:10

    },
    textstyle:{
        color:'#fff',
        fontFamily: 'Poppins-SemiBold',
    },
    textstyle2:{
        color:'#fff',
        fontFamily: 'Poppins-SemiBold',
        marginLeft:'3%'
    },
    othertexrt:{
        fontSize:20,
        color:"#c59619",
    
        fontFamily: 'Poppins-SemiBold',
        marginLeft:'7%', marginTop:'4%'
    },
    viewstyle2:{
        height:'auto', 
        width:'85%', 
        backgroundColor:'#333333', 
        alignSelf:'center', borderRadius:15,paddingBottom:10
    },
    flexrow2:{
        flexDirection:'row',
        marginTop:'5%',paddingTop:5
    },
    flexrow3:{
        marginTop:'2%',
    },
    viewstyleadd:{
        height:20, width:20,
        borderRadius:20,borderColor:'#fff', borderWidth:2,
        // marginTop:'8%', 
        marginLeft:'5%', justifyContent:'center',


    },
    plus:{
        height:10, width:10, tintColor:'#fff', alignSelf:'center'
    }
})