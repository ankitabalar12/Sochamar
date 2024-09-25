import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21242b',
    },
    flexrow1: {
        flexDirection: "row",
        justifyContent: "space-between", marginTop: "5%", marginHorizontal: "5%"
    },
    back: {
        height: 20,
        width: 20,
        tintColor: "#c59619",
    },
    back2: {
        height: 17,
        width: 17,
        tintColor: "#fff",
    },
    profileview: {
        flexDirection: "row", marginHorizontal: "5%", marginTop: "5%"
    },
    proview: {
        height: 50, width: 50, backgroundColor: "#737373", borderRadius: 50
    },
    usertext: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: "5%",
        marginTop: "3%"
    },
    maniview: {
        height: 140,
        width: '100%',
        backgroundColor: '#21242b',

        borderColor: "#16181d",
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // This is for Android
    },
    video: {
        height: 20,
        width: 20,
        tintColor: "#c59619",
    },
    telephone: {
        height: 20,
        width: 20,
        tintColor: "#c59619",
    },
    position: {
        position: "absolute",
        right: 40,
        marginTop: "4%"
    },
    position2: {
        position: "absolute",
        right: 10,
        marginTop: "4%"
    },
    flexdr: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        marginHorizontal: '2%',
        position: "absolute",
        bottom: 10,
        margin:2
    },
    sendmsgview: {
        height: 60,
        width: "89%",
        backgroundColor: "#000",
        borderRadius: 10,
       justifyContent:'center'
        
    },
    addallview:{
        height:35,
         width:35,
          borderRadius:20,
           backgroundColor:'#000',
         marginLeft:'2%', justifyContent:"center",
         alignSelf:"center"
     },
    input:{
        marginLeft:"2%", color:'#fff'
    },
    flexrow1msg:{
        flexDirection:"row",
        marginLeft:"2%"
    },
    photo:{
   height:30, width:30, tintColor:'#fff', marginTop:10,marginLeft:2
    },
    sendtwo:{
        height:20, width:20,tintColor:"#c59619" 
    },
    msgsendsty:{
        alignSelf:"center", position:"absolute", right:10
    },
    plus:{
        alignSelf:'center',
        height:20, width:20, 
        tintColor:"#c59619"
    },
    usersendthemsg:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    usersendthemsg2:{
        padding: 10,
        borderRadius: 10,

        marginHorizontal: '5%',
    },
    margintopview:{
       marginBottom:"20%"
    },
    textstylecol:{
        fontSize: 10, color: '#fff'
    },
    mainviewstyles:{
        height:300, width:"75%", backgroundColor:"#fff",
        position:'absolute', bottom:100, alignSelf:"center",
        borderRadius:20

    },
    flexroefour:{
        flexDirection:'row', justifyContent:"space-between", marginHorizontal:'5%', marginTop:"4%"
    },
    viewaddstyle:{
        height:60, width:60, borderRadius:70, backgroundColor:'red',
        justifyContent:'center',backgroundColor:'#4d4dff'
    },
    viewaddstyle1:{
        backgroundColor:'#4d4dff'
    },
    viewaddstyle2:{
        backgroundColor:'#cc0099', marginLeft:-15
    },
    viewaddstyle3:{
        backgroundColor:'#b31aff'
    },

    viewaddstyle4:{
        backgroundColor:'#ff531a'
    },
    viewaddstyle5:{
        backgroundColor:'#008000'
    },
    viewaddstyle6:{
        backgroundColor:'#ffa31a'
    },
    viewaddstyle7:{
        backgroundColor:'#66a3ff'
    },
    viewaddstyle8:{
        backgroundColor:'#4d4dff', marginLeft:"32%"
    },
    viewaddstyle9:{
        backgroundColor:'#4d4dff'
    },
    document:{
        height:30, width:30, alignSelf:"center", tintColor:"#fff"
    },
    documenttext:{
        color:"#000",
        fontFamily: 'Poppins-SemiBold',
        textAlign:'center'
    },
    flexroefour2:{
       flexDirection:'row', marginLeft:"5%", marginTop:"5%"
    },
    documenttext2:{
        marginLeft:-11
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      messageBubble: {
        padding: 10,
        borderRadius: 15,
        maxWidth: '80%',
        marginLeft:'2%'
      },
      messageImage: {
        width: 100,
        height: 100,
        marginVertical: 5,
      },
      messageTime: {
        fontSize: 12,
        color: '#888',
        alignSelf: 'flex-end',
        marginHorizontal: 10,
      },
      modalviewstyle:{
        height:30, width:100,
        borderRadius:5,
        backgroundColor:'#c59619',
        position:'absolute',
        right:20,
        top:50,
        justifyContent:'center',
      },
      textprostyle:{
        alignSelf:"center",
        color:'#fff',
        fontWeight:"900"
      }
      
})