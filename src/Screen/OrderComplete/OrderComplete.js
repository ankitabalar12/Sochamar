import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './syles'
import { icons } from '../../Helper/icons'
import { String } from '../../Helper/string'
import LongButton from '../../Componets/LongButton/LongButton'

const OrderComplete = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={icons.ordercom} style={styles.ordercom} />
      <Text style={styles.OrderComplete}>{String.OrderComplete}</Text>
      <Text style={styles.Etiam}>{String.Etiam}</Text>
      <LongButton
        title={String.Viewbooking}
        confirmpayscreenbutton={styles.confirmpayscreenbutton}
        onPress={() => navigation.navigate('Home')}

      />
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.Etiam2}>{String.discover}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default OrderComplete

