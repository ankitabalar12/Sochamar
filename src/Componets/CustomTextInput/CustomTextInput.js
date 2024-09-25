import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomTextInput = ({ placeholder, multiline,value,numberOfLines, textAlignVertical,placeholderTextColor, onChangeText, secureTextEntry, keyboardType,style,mainviewstyle }) => {

    
    return (
        <View style={[styles.mainview,mainviewstyle]}>
            <TextInput
                style={style}
                placeholder={placeholder}
                value={value}
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                textAlignVertical={textAlignVertical}
                numberOfLines={numberOfLines}
                multiline={multiline}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    mainview: {
        height: 50,
        width: '90%',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: '5%', alignSelf: "center", justifyContent:'center',
    }
})
export default CustomTextInput