import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#21242b',
        flex: 1,
    },
    textinputstyle: {
        height: 50,
        width: "85%",
        backgroundColor: "#3b3b3b",
        alignSelf: "center",
        borderRadius: 10,
         marginTop:'3%'
    },
    
    textlabel:{
       color:'#fff' , 
       fontSize:15,
       fontFamily: 'Poppins-SemiBold',
       marginLeft:'9%',
     

    },
    textaligstyle:{
        marginLeft:"3%",
        color:'#fff'
    },
    flexrow:{
        flexDirection:"row",  marginTop:"10%"
    },
    viewstyle3: {
        height: 20,
        width: 20,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginLeft: '3%',
        justifyContent: 'center',
    },
    question: {
        height: 15, width: 15, alignSelf: 'center', tintColor: '#c59619'
    },
    textaligstyle2:{
        height:150, width:"85%",
        backgroundColor: "#3b3b3b",
        alignSelf: "center",
        borderRadius: 5,
         marginTop:'3%', 
    },
    stylebutton:{
        width:"85%", borderRadius:5, marginTop:'10%'
    },
    erroetext: {
        fontSize: 14,
        color: 'red',
        marginTop: 4,
        alignSelf: 'flex-start',
        marginLeft: '9%'
      }
})