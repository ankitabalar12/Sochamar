import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242b',
  },
  flexrow: {
    flexDirection: 'row',
    marginTop: '5%',
    marginHorizontal: "6%"
  },
  Profileview: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderRadius: 50,

  },
  flexrow2: {
    flexDirection: "row", marginLeft: '5.5%'
  },
  users: {
    height: 50,
    width: 50,
    borderRadius: 50

  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginTop: "1%",
    marginLeft: '8%'
  },
  bell: {
    height: 20,
    width: 20, tintColor: '#999999',

  },
  imges: {
    position: "absolute",
    right: 0,
    marginTop: '1%'
  },
  imges2: {
    position: "absolute",
    right: 30,
    marginTop: '1%'
  },
  locationpin: {
    height: 20, width: 20,
    tintColor: "#c59619"
  },
  text2: {
    // color: '#8c1aff',
    color: '#c59619',
    marginLeft: "2%",
    fontSize: 10,

  },
  mainview: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#21242b',
    alignSelf: "center",

  },
  // discountview2:{
  //     height:210,
  //      width:'100%',
  //     //  backgroundColor:"#f8801b",
  //      borderRadius:20, alignSelf:'center', marginTop:'10%'
  // },
  discountview: {
    height: 190,
    width: '95%',
    backgroundColor: "#f8801b",
    borderRadius: 20, alignSelf: 'center', marginTop: '10%'
  },
  discountview2: {
    flex: 1,
    flexDirection: 'row',
    //marginTop:30,
    marginHorizontal: "2%"
  },
  discountItem: {
    height: 190,
    width: 310,
    backgroundColor: "#000",
    borderRadius: 20, alignSelf: 'center',
    marginTop: 15, marginBottom: 15, marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8, // For Android
  },
  flexrow3: {
    flexDirection: 'row'
  },
  textline: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    marginTop: '7%', marginLeft: "5%"
  },
  textline2: {
    fontSize: 30,
    color: '#fff',
    marginLeft: "5%"
  },
  textline3: {
    fontSize: 13,
    color: '#fff',
    marginLeft: "5%",
    fontFamily: 'Poppins-SemiBold',
  },
  buttonview: {
    height: 40,
    width: '60%',
    backgroundColor: "#c59619",
    borderRadius: 50,
    marginLeft: '5%',
    marginTop: '5%', justifyContent: 'center',
    alignItems: "center"

  },
  booknowtext: {
    color: "#fff",
    fontFamily: 'Poppins-SemiBold',
  },
  paintingman: {
    height: 150,

    width: 150, position: "absolute",
    bottom: -29, right: 10
  },
  acreparing: {
    height: 140,
    width: 160, position: "absolute",
    right: 0, top: 50
  },
  flexrow4: {
    flexDirection: 'row', marginHorizontal: '10%', justifyContent: 'space-between'
  },
  Categories: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  viewad: {
    color: "#c59619",
    fontFamily: 'Poppins-SemiBold',
  },
  categroriesview: {
    height: 70,
    width: 70,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: "5%",
    margin: 10,
    justifyContent: 'center',
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 2
  },
  police: {
    height: 30, width: 30
  },
  categroriesview2: {
    backgroundColor: '#eee5ff'
  },
  categroriesview3: {
    backgroundColor: '#fde7e5'
  },
  categroriesview4: {
    backgroundColor: '#dbfdeb'
  },
  categroriesview5: {
    backgroundColor: '#e6f4ff'
  },
  categroriesview6: {
    backgroundColor: '#fef5e5'
  },
  categroriesview7: {
    backgroundColor: '#eee5ff'
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 10, // Add some space between rows
  },
  maincontainer: {
    height: 100,
    width: 100,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft:30
  },
  viewtext: {
    color: '#fff', textAlign: "center", fontSize: 12
  },
  viewtext2: {
    color: '#fff', textAlign: "center", fontFamily: 'Poppins-SemiBold',
  },
  marginbottom: {
    marginBottom: '4%'
  },
  maniviewtwo: {
    width: 180,
    height: 200,
    backgroundColor: '#fff',
    // marginHorizontal: 10,
    borderRadius: 20,
    marginTop: "2%",
    margin: 10,

    justifyContent: 'center'
  },
  marginbott: {
    marginBottom: '30%'
  },
  acreparing2: {
    height: '100%',
    width: '100%',
    alignSelf: 'center', borderRadius: 20
  },
  bottonstyle: {
    height: 20, width: "100%", backgroundColor: 'rgba(0, 0, 25, 0.5)', position: 'absolute', bottom: 11,
    // borderBottomRightRadius:20, borderBottomLeftRadius:20
  },
  // container: {
  //   flex: 1,
  // },
  // backgroundImage: {
  // marginTop:'5%',
  // flex: 1,
  // width:'100%',alignSelf:"center", height:'100%'
  // },

  maincontainertwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#000',


    // borderColor: '#E4D5D5', borderWidth: 2

  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '40%',
    // borderRadius: 10,
  },
  modalviewstyle: {
   width: "100%",
    height: '100%',
    backgroundColor: "#000",
    position: 'absolute', 
    top: 300,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
     zIndex: 1,

  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f57c00',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
  leftarrow: {
    height: 20, width: 20
  },
  flerow: {
    flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%', marginTop: "10%"
  },
  heart: {
    height: 25, width: 25
  },
  textstyle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff', fontSize: 16,
    alignSelf: 'center',
  },
  flexrowd1: {
    flexDirection: 'row', marginLeft: '5%', marginTop: '5%'
  },
  textstyle2: {
    color: '#fff',
    alignSelf: 'center'
  },
  threeview: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginHorizontal: '10%',
    marginTop: "5%"
  },
  textstyle3: {
    color: '#cccccc', fontSize: 14,
    fontFamily: 'Poppins-SemiBold',

  },
  flexreow22: {
    flexDirection: "row"
  },
  star: {
    height: 15, width: 15, tintColor: "#f8801b"
  },
  centerview: {
    height: 50, width: 3, backgroundColor: '#8c8c8c',
  },
  textstyle4: {
    color: '#cccccc', fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  texttwofdf: {
    color: '#808080', marginHorizontal: '5%', marginTop: '8%', fontSize: 15

  },
  abiutprovi: {
    fontSize: 18,
    color: '#fff',
    marginLeft: '5%',
    marginTop: "5%",
    fontFamily: 'Poppins-SemiBold',

  },
  starview: {
    height: 90,
    width: '90%',
    backgroundColor: "#333333",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: '2%', justifyContent: 'center'
  },
  imgviewew: {
    height: 60,
    width: 60,

    marginLeft: '3%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowflex: {
    flexDirection: "row"
  },
  model: {
    height: 60, width: '100%',
    borderRadius:50
  },
  Kristin: {
    color: '#fff',
    marginLeft: "5%",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14
  },
  starrow: {
    flexDirection: "row"
  },
  star1: {
    height: 15, width: 15, tintColor: "#f8801b", marginLeft: "5%", marginTop: '2%'
  },
  found: {
    height: 15, width: 15, tintColor: "#1a1a1a",
  },
  rounfview: {
    height: 20, width: 20, borderRadius: 20, borderWidth: 2, borderColor: "#1a1a1a",
    position: 'absolute', right: 20,
    justifyContent: "center",

  },
  ewrstyle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  marginbottcds: {
    marginBottom: "100%", marginTop: '50%'
  },
  bookingbutton: {
    height: 50,
    width: '65%',
    borderRadius: 50,
    //  backgroundColor:'#7d00fd',
    backgroundColor: "#c59619",
    marginTop: '10%',
    justifyContent: "center",
    alignSelf: 'center'
  },
  textbooking: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  mainviewbookservice: {
    height: 700, width: "100%", backgroundColor: '#fff',

    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50
  },
  flexrowbook: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "8%",
    marginHorizontal: '9%', marginBottom: "2%"
  },
  booktext: {
    color: '#000',
    fontSize: 19,
    fontStyle: 'italic',
    fontFamily: 'Poppins-SemiBold',
  },
  bookview: {
    height: 25,
    width: 25,
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 2, justifyContent: 'center'
  },
  close: {
    height: 11, width: 11, tintColor: '#000', alignSelf: "center"
  },
  nametext: {
    fontSize: 17,
    color: "#000",
    fontFamily: 'Poppins-SemiBold',
    marginLeft: '9%', marginTop: "5%"
  },
  bookservicevire: {
    height: 50,
    width: '80%',
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
    marginTop: '1%', justifyContent: 'center'
  },
  nameflexrow: {
    flexDirection: "row", justifyContent: 'space-between', marginHorizontal: '5%',
  },
  man: {
    height: 27,
    width: 27,
    tintColor: "#808080", marginTop: "3%"
  },
  date: {
    height: 22, width: 22, tintColor: "#808080",
  },
  payonlinerow: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: "6%", marginHorizontal: "9%"
  },
  cashonline: {
    flexDirection: 'row',
  },
  payonlinetext: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    // marginLeft:'5%'
    color: '#223bf5'

  },
  dollorview: {
    height: 20,
    width: 20,
    backgroundColor: '#223bf5',
    borderRadius: 5,
    marginTop: '4%',
    marginLeft: '2%',
    justifyContent: 'center'
  },
  dollortext: {
    color: '#fff',
    fontSize: 15,
    alignSelf: 'center'
  },
  creditcard: {
    height: 20,
    width: 30,
    tintColor: '#223bf5',
    marginTop: '4%',
    marginRight: '2%'
  },
  Bookingserbutton: {
    height: 50,
    width: "80%",
    backgroundColor: '#f7bd1b',
    alignSelf: 'center',
    justifyContent: 'center', borderRadius: 50, marginTop: "5%"
  },
  bookingse: {
    color: '#fff', fontSize: 16, textAlign: "center",
    fontFamily: 'Poppins-SemiBold',
  },
  mainview3: {
    height: 40,
    width: '90%',
    backgroundColor: "#000",
    alignSelf: "center",
    marginTop: "3%",
    borderRadius: 50, justifyContent: 'center'
  },
  flexrow3: {
    flexDirection: 'row'
  },
  search: {
    height: 20, width: 20, tintColor: '#8c8c8c', marginLeft: '5%'
  },
  margin: {
    marginLeft: '5%', justifyContent: 'center'
  },
  input: {
    color: '#fff'
  },
  contentContainer: {
    // paddingBottom: 20,
    // flexGrow: 1,
    // height:'100%'
  },
  scrollViewContent:{
    // backgroundColor:'red',
    // zIndex:1
    
    // height:'100%'
  },
  bookingbuttontwo:{
    marginTop:25,
    
     height: 50,
     width: '65%',
  },
  bookingbuttontrr:{
    marginTop:10
  },
  noRating:{
    color:'#fff',
    alignSelf:'center'
  }
})
