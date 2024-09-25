import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#21242b',
        flex: 1, 
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
    mainview: {
        height: '80%',
        width: '90%',
        backgroundColor: '#2a2622',

        alignSelf: 'center',
        marginTop: "2%",
        borderRadius: 10
    },
    mainview: {
        height: '80%',
        width: '90%',
        backgroundColor: '#2a2622',

        alignSelf: 'center',
        marginTop: "2%",
        borderRadius: 10
    },
    textsweet: {
        fontSize: 15,
        color: '#f4f2f1', marginLeft: 25,
         marginTop: '7%'

    },
    viewstyle2: {
        height: 1, width: '90%', backgroundColor: '#f4f2f1', alignSelf: "center", marginTop: '3%'
    },
    flexrow2: {
        flexDirection: "row",


    },
    leftarrow: {
        height: 20, width: 20,
        tintColor: '#fff',
        marginLeft: 10,
        marginTop: 10
    },
    textupload: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#d2cbc6',
        marginLeft: 21,
        marginTop: 5

    },
    buttonstyle2:{
        borderRadius:5,
        flexDirection:'row'
    }
})