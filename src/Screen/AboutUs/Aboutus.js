import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import Headerviewbackarrow from '../../Componets/Headerviewbackarrow/Headerviewbackarrow'
import { String } from '../../Helper/string'

const Aboutus = () => {
  return (
    <View style={styles.container}>
     <Headerviewbackarrow
  title={String.aboutus}/>
  <Text style={styles.textlinr}>{String.aboutustext}</Text>
    </View>
  )
}

export default Aboutus

