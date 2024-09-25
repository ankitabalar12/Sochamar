import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#21242b',
        flex: 1
    },
    flexrow: {
        flexDirection: 'row',

    },
    user: {
        height: 30, width: 30, tintColor: "#c59619", marginLeft: '5.5%',
        marginTop: '2%', marginRight: '4%', alignSelf:'center'
    },
    usere: {
        marginLeft: '6%'
    },
    textregister: {
        marginLeft: '10%',
        fontSize: 15,
        color: "#808080",
        fontFamily: 'Poppins-SemiBold',
        marginTop: '1%',

    },
    textregister2: {
        marginLeft: '8%'
    },
    merbottom: {
        marginBottom: "15%"
    },
    user2: {
        height: 20, width: 20,
        tintColor: "#c59619",
        marginLeft: '7%'
    },
    user1: {
        height: 20, width: 20,
        tintColor: "#c59619",
        marginTop: "3%",
        marginLeft: '7%',
        marginRight: '5%',
        alignSelf:"center"
    },
    fullview:{
        height:300, 
        width:"95%",
         backgroundColor:'red',
        backgroundColor: '#21242b',
        justifyContent: 'center',
        // alignItems: 'center',
        alignSelf:"center",
        // borderColor: "#16181d",
        // borderWidth: 1,
        borderRadius:10,
        borderBottomColor:"#16181d",
        borderBottomWidth:1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // This is for Android
    },
    flexrow2:{
        flexDirection:"row", 
        marginHorizontal:"9%",
        marginTop:"10%"
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        // borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor:'#fff',
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // This 
      },
      checked: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
      checkmark: {
        color: '#fff',
        fontSize: 12,
      },
      label: {
        fontSize: 16,
        color:'#c59619', marginHorizontal:"9%", 
      },
      loginaccout:{
        flexDirection:"row",
        alignSelf:"center",
         marginTop:'8%'
      },
      label2:{
        fontSize:13,
        fontFamily: 'Poppins-SemiBold',
        color:'#808080'
      },
      label3:{
        color:"#c59619",
        textDecorationLine: 'underline',
      },
      erroetext: {
        fontSize: 14,
        color: 'red',
        marginTop: 4,
        alignSelf: 'flex-start',
        marginLeft: '9%'
      },
      textinputview:{
       color:'#000'
    },
    mainview: {
      height: 50,
      width: '90%',
      backgroundColor: "#fff",
      alignSelf: "center",
      borderRadius: 50,
      marginTop: "5%"
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
})