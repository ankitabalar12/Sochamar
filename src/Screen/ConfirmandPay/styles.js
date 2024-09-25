import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#21242b',
    flex: 1,
  },
  flexrow: {
    flexDirection: "row"
  },
  confimview: {
    height: 130,
    width: "30%",
    backgroundColor: "#fff",
    marginLeft: "5%",
    marginTop: "5%",
    borderRadius: 20
  },
  mainiew: {
    height: 450,
    width: "90%",
    borderColor: "#2c303a",
    borderWidth: 1,
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android, 
    marginTop: "5%"
  },
  serviceman: {
    height: '100%', width: '100%',  borderRadius: 20
  },
  Jeanettestyle: {
    color: '#fff',
    marginRight: "15%",
    marginTop: "15%",
    marginLeft: "7%",
    fontFamily: 'Poppins-SemiBold',

  },
  date: {
    height: 17,
    width: 17,
    tintColor: "#808080",
    //  marginLeft:'5%',
    //   marginTop:'2%'
  },
  flewcodate: {
    flexDirection: "row", marginLeft: "8%"
  },
  selecteddate: {
    color: '#fff',
    marginLeft: "5%",

  },
  daterflex: {
    flexDirection: 'row'
  },
  timerow: {
    flexDirection: "row", marginTop: "3%"
  },
  youevent: {
    color: "#737373",
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginTop: "6%", marginLeft: "6%"
  },
  serviceflex: {
    flexDirection: 'row',
    marginTop: '2%', marginLeft: '7%'
  },
  wrench: {
    height: 20, width: 20, tintColor: '#fff'
  },
  Services: {
    color: '#fff', marginLeft: "2%"
  },
  Standart: {
    position: "absolute", right: 20, color: '#fff'
  },
  serviceflex2: {
    marginTop: '3%'
  },
  priceflex: {
    flexDirection: "row", justifyContent: 'space-between'
  },
  Price: {
    color: '#fff', marginLeft: "8%"

  },
  Appsfee: {
    color: '#fff', marginLeft: "8%"
  },
  Totalprice: {
    color: '#fff', marginLeft: "8%"
  },
  Price2: {
    marginRight: "7%"
  },
  priceflex2: {
    marginTop: "2%"
  },
  PaymentMethod: {
    marginLeft: "8%",
    marginTop: '5%',
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',

  },
  PaymentMethod2:{
    marginLeft: "8%",
    marginTop: '5%',
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  Paymenivewbutton: {
    height: 70,
    width: "85%",
    //  backgroundColor:'red',
    borderColor: "#404040",
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: '5%',
    justifyContent: 'center'
  },
  pyameflex: {
    flexDirection: 'row',

  },

  texttext: {
    color: '#fff', marginLeft: '7%'
  }
  ,


  tworow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: "5%"
  },
  roundview: {
    height: 25,
    width: 25,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    marginRight: 10,
  },
  roundview2: {
    height: 25,
    width: 25,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
    position: 'absolute',
    left: 15
  },
  textContainer: {
    marginLeft: 10,
  },
  rightarrow: {
    height: 17, width: 17, tintColor: '#404040'
  },
  rightposi: {
    position: "absolute", right: 15,
    marginTop: 10
  },
  confirmpayscreenbutton: {
    borderRadius: 100, marginTop: "9%", width: "85%",
  },
  bittommarginsad: {
    marginBottom: "20%"
  },
  mainviewmodal: {
    height: 450, width: "100%", backgroundColor: "#fff",
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  logview:{
    height:7,
     width:'10%',
     backgroundColor:"#bfbfbf",
     alignSelf:'center',
     borderRadius:10, marginTop:"4%"
  },
  paymethodview:{
    height:80,
    width:'85%', 
    borderRadius:20,
    alignSelf:'center',
   backgroundColor:'#fff',
   shadowOffset: {
     width: 0,
     height: 1,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5, // This is for Android
   marginTop:'1%', justifyContent:'center'
  },
  paymethodview2:{
marginTop:"2%"
  },
  flexrowpay:{
    height:50,
     width:50, 
    borderRadius:10, 
    backgroundColor:"#f2f2f2",
    marginLeft:"5%", justifyContent:'center'
  },
  paypal:{
    height:30, width:30, alignSelf:"center"
  },
  flewrowpay:{
    flexDirection:"row"
  },
  papyall:{
    color:'#000',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginLeft:'7%', 
  },
  papyall2:{
    marginLeft:"15%"
  },
  sascom3:{
    marginLeft:'15%'
  },
  sascom:{
    marginLeft:"7%"
  },
  // checkbox: {
  //   // Styles for the checkbox when not selected
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   padding: 5,
  // },
  checkboxSelected: {
    // Styles for the checkbox when selected
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  checkboxContainer: {
    // Container styles for the checkbox
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    position:"absolute", right:10
  },
  paymethodview3:{
    height:60,
    marginTop:"2%"
  },
  addvide:{
    height:20, width:20,
     borderWidth:2, borderColor:'#808080',
     borderRadius:20, justifyContent:'center'
  },
  flexaddrow:{
    flexDirection:"row",
    marginLeft:'7%'

  },
  plus:{
    height:10, width:10, alignSelf:'center', tintColor:'#808080'  },
    checkbox:{
      height:20, width:20, borderRadius:5, borderColor:'#999999', borderWidth:2
    },
    checkboxtou:{
      position:'absolute', right:25, justifyContent:'center', alignItems:"center"
    },
    checkmark:{
      height:15,
       width:15, alignSelf:'center', tintColor:'#FFF'
    },
    checkboxview:{
      height:20, width:20, borderRadius:5,
      backgroundColor:'#c59619',justifyContent:'center', borderColor:'#c59619', borderWidth:2
    }
})