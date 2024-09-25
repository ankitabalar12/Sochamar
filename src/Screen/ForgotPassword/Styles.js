import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    caontainer: {
        backgroundColor: '#21242b',
        flex: 1
    },
    password:{
        height:70,
         width:70,
         alignSelf:'center', marginTop:"20%", tintColor:"#c59619"
    },
    forgottext:{
        fontSize:20, 
        fontFamily: 'Poppins-SemiBold',
        textAlign:"center", marginTop:'5%', color:"#404040"
    },
    forgottext2:{
     fontSize:13,
     fontFamily: 'Poppins-SemiBold',
     color:"#808080",
     textAlign:"center", marginHorizontal:'10%'
    },
    mainview: {
        height: 50,
        width: '90%',
        backgroundColor: "#fff",
        alignSelf: "center",
        borderRadius: 50,
        marginTop: "5%"
    },
    rowview: {
        flexDirection: 'row'
    },
    iconsview: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#f1f2f4',
        justifyContent: "center",
        marginRight: '2%'
    },
    mail: {
        height: 20,
        width: 20,
        tintColor: '#c59619',
        alignSelf: "center"
    },
    erroetext: {
        fontSize: 14,
        color: 'red',
        marginTop: 4,
        alignSelf: 'flex-start',
        marginLeft: '9%'
      }
})