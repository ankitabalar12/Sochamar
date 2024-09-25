import { Alert, Image, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Headerviewbackarrow from '../../Componets/Headerviewbackarrow/Headerviewbackarrow'
import { styles } from './styles'
import { String } from '../../Helper/string'
import CustomTextInput from '../../Componets/CustomTextInput/CustomTextInput'
import { icons } from '../../Helper/icons'
import LongButton from '../../Componets/LongButton/LongButton'
import { firestore } from '../firebaseHelper'

const Helpcenter = () => {
  const [email, setEmail] = useState('')
  const [describe, setDescribe] = useState('')
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const addhelpcenter = async ({navigation}) => {
    const newErrors = {};
    if (!email) newErrors.email = 'Please enter your email';
    if (!describe) newErrors.describe = 'Please enter your describe';
    try {
      await firestore()
        .collection('helpcenter')
        .add({
          email: email,
          describe: describe,
        });
      Alert.alert(
        'Success',
        'Helpcenter added successfully!',
        [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]
      );
    } catch (error) {
      console.error('Error adding address: ', error);
      Alert.alert(
        'Error',
        'There was a problem adding the Helpcenter. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Headerviewbackarrow
          title={String.helpcenter} />
        <View style={styles.flexrow}>
          <Text style={styles.textlabel}>{String.Youremail}</Text>
          <View style={styles.viewstyle3}>
            <Image source={icons.question} style={styles.question} />
          </View>
        </View>
        <View style={styles.textinputstyle}>
          <TextInput
            style={styles.textaligstyle}
            placeholder="Enter your email"
            placeholderTextColor={'#8391A1'}
            value={email}
            multiline={true}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        {errors.email && <Text style={styles.erroetext}>{errors.email}</Text>}
        <View style={styles.flexrow}>
          <Text style={styles.textlabel}>{String.Describe}</Text>
          <View style={styles.viewstyle3}>
            <Image source={icons.question} style={styles.question} />
          </View>
        </View>
        <View style={styles.textaligstyle2}>
          <TextInput
            style={styles.textaligstyle}
            placeholder="Enter your Describe"
            placeholderTextColor={'#8391A1'}
            value={describe}
            multiline={true}
            onChangeText={(describe) => setDescribe(describe)}
          />
        </View>
        {errors.describe && <Text style={styles.erroetext}>{errors.describe}</Text>}
        <LongButton
          stylebutton={styles.stylebutton}
          title={String.submit}
          onPress={addhelpcenter}
        />
      </ScrollView>
    </View>
  )
}

export default Helpcenter

