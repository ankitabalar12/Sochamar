import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cantainer: {
        backgroundColor: '#21242b',
        flex: 1
    },
    logo: {
        height: 100,
        width: 100,
        alignSelf: "center",
        marginTop: '10%',
        marginBottom: "10%"

    },


    sociallogo:{
        height: 40,
        width: 40,
        alignSelf: "center",marginLeft:15

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
    forgottext: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#808080',
        marginLeft: "9%",
        marginTop: "1%"
    },
    rowviwflex:{
     flexDirection:"row",
        alignSelf:"center", marginTop:"5%"
    },
    forgottext2:{
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#c59619',
        textDecorationLine: 'underline',
       
    },
    tex:{
        marginTop: "1%"      
    },
    erroetext: {
        fontSize: 14,
        color: 'red',
        marginTop: 4,
        alignSelf: 'flex-start',
        marginLeft: '9%'
      },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
      },
})
