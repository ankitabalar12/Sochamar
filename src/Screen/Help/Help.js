import { Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { icons } from '../../Helper/icons'
import { String } from '../../Helper/string'

const Help = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.viewstyle2}>
                <View style={styles.flexrow}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                        <View style={styles.viewstyle}>
                            <Image source={icons.woman} style={styles.woman} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                        <Image source={icons.notification} style={styles.notification} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.ewlcom}>{String.Welcom}</Text>
            <Text style={styles.Howcan}>{String.Howcan}</Text>
            <View style={styles.flexrow1}>
                <TouchableOpacity style={styles.manview} onPress={() => navigation.navigate('Location')}>
                    {/* addloop */}
                    <View style={styles.witheview}>
                        <Image source={icons.gallry3} style={styles.gallry3} />
                        <Text style={styles.noimagefound}>{String.noimagefound}</Text>
                    </View>
                    <Text style={styles.sweet}>{String.sweet}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.manview}>
                    <View style={styles.witheview}>
                        <Image source={icons.gallry3} style={styles.gallry3} />
                        <Text style={styles.noimagefound}>{String.noimagefound}</Text>
                    </View>
                    <Text style={styles.sweet}>{String.NonVeg}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flexrow1}>
                <TouchableOpacity style={styles.manview}>
                    {/* addloop */}
                    <View style={styles.witheview}>
                        <Image source={icons.gallry3} style={styles.gallry3} />
                        <Text style={styles.noimagefound}>{String.noimagefound}</Text>
                    </View>
                    <Text style={styles.sweet}>{String.mikl}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.manview}>
                    <View style={styles.witheview}>
                        <Image source={icons.gallry3} style={styles.gallry3} />
                        <Text style={styles.noimagefound}>{String.noimagefound}</Text>
                    </View>
                    <Text style={styles.sweet}>{String.nasta}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.manview2}>
                <View style={styles.witheview}>
                    <Image source={icons.gallry3} style={styles.gallry3} />
                    <Text style={styles.noimagefound}>{String.noimagefound}</Text>
                </View>
                <Text style={styles.sweet}>{String.nasta}</Text>
            </TouchableOpacity>
            <View style={styles.verifyline}>
                <View style={styles.flexrow7}>
                    <View style={[styles.veryview]}></View>
                    {/* <View style={{backgroundColor:'yellow'}}></View> */}
                    <View style={[styles.veryview]}></View>
                    <View style={styles.veryview}></View>
                </View>

            </View>
        </View>
    )
}

export default Help

