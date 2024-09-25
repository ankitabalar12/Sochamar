import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import { icons } from '../../Helper/icons';

const Rowbutton = ({ onPress, title }) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.flexrow}>
                        <Text style={styles.textstyle}>{title}</Text>
                        <Image source={icons.plus} style={styles.plus} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Rowbutton;

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: "55%",
        backgroundColor: "#c59619",
        justifyContent: 'center',
        // alignItems: "center",
        alignSelf: "center",
        borderRadius: 5,
        marginTop: '10%'

    },
    textstyle: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#000'
    },
    flexrow: {
        flexDirection: "row", 
        alignSelf:'center'
    },
    plus:{
        height:10,
         width:10,
        tintColor:'#000', marginLeft:'2%', marginTop:'3%'
    }
})