import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { icons } from '../../Helper/icons'
import { useNavigation } from '@react-navigation/native';

const CreossButton = ({ onPress, title }) => {

    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
      };
    return (
        <TouchableOpacity onPress={handleBackPress}>
            <View style={styles.foxerow}>
                <View style={styles.mainview}>
                    <Image source={icons.close} style={styles.close} />
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    mainview: {
        height: 30,
        width: 30,
        backgroundColor: '#999480',
        borderRadius: 20, justifyContent: 'center',

        marginLeft: "3%"

    },
    close: {
        height: 10, width: 10,
        tintColor: '#fff',
        alignSelf: "center"
    },
    text: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#999480', marginLeft: '5%'
    },
    foxerow: {
        flexDirection: 'row', marginTop: '5%',
    }
})
export default CreossButton