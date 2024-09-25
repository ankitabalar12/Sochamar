import { Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { icons } from '../../Helper/icons'
import { String } from '../../Helper/string'

import Rowbutton from '../../Componets/Rowbutton/Rowbutton'

const Location = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.flexrow}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                <View style={styles.viewstyle}>
                    <Image source={icons.woman} style={styles.woman} />
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={icons.notification} style={styles.notification} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainview}>
                <View style={styles.flexrow2}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <Image source={icons.leftarrow} style={styles.leftarrow} />
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Help')}
                        style={styles.textupload}>{String.location}</Text>
                </View>
                <Text style={styles.textsweet}>1. Service: Sweets Mithai</Text>
                <View style={styles.viewstyle2}></View>
                <Text style={styles.textsweet}>2. Upload Files</Text>
                <View style={styles.viewstyle2}></View>
                <Rowbutton
                    title={String.Add}
                    onPress={() => navigation.navigate('Address')}
                />

            </View>
        </View>
    )
}

export default Location

