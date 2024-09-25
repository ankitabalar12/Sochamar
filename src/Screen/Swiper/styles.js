import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {

        backgroundColor: '#21242b',
        flex: 1

    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        position: "absolute",
        right: 10,
    },
    slide: {
        flex: 1,width:'95%',alignSelf:'center',
        //justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#9DD6EB',
    },
    multipe: {
        alignSelf: "center",
        marginTop: "20%"
    },
    Multipletext: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        textAlign: "center",
        marginTop: "5%",
    },
    ouravaitext: {
        textAlign: 'center',
        marginHorizontal: "20%",
        color: '#e6e6e6',
        marginTop: '2%',fontFamily: 'Poppins-SemiBold',fontSize: 13,
    },
    Multipletext2: {
        marginTop: "5%"
    },
    ouravaitext2: {
        marginHorizontal: "25%"
    },
    bookingnow: {
        height: 300, width: 400, alignSelf: "center"
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 5,


    },
    activeDotStyle: {
        width: 30,
        height: 12,
        borderRadius: 5,
        backgroundColor: '#c59619',
        marginHorizontal: 5,


    },
    buttonview:{
        height:40,
         width:40,
         borderRadius:60,
         backgroundColor:'#c59619', position:"absolute", right:20, bottom:30, justifyContent:'center'
    },
    rightarrowtwo:{
        height:20, width:20, alignSelf:"center", tintColor:"#fff"
    }
})