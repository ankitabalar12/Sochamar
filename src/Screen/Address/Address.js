import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import CustomTextInput from '../../Componets/CustomTextInput/CustomTextInput'
import CreossButton from '../../Componets/CreossButton/CreossButton'
import { String } from '../../Helper/string'
import LongButton from '../../Componets/LongButton/LongButton'
import { firestore } from '../firebaseHelper'

const Address = ({navigation}) => {
  const [addresstitle, setAddresstitle] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [address, setAddress] = useState('')
  const [Unitnumber, setUnitNumber] = useState('')
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
 
 
 


  const addaddress = async () => {
    const newErrors = {};
    if (!addresstitle) newErrors.addresstitle = 'Please enter your addresstitle';
    if (!zipcode) newErrors.address = 'Please enter your zipcode';
    if (!address) newErrors.address = 'Please enter your address';
    if (!Unitnumber) newErrors.Unitnumber = 'Please enter your Unitnumber';
   
  
    try {
      await firestore()
        .collection('address')
        .add({
          addresstitle: addresstitle,
          zipcode: zipcode,
          address: address,
          Unitnumber: Unitnumber,
          
        });
  
     
      Alert.alert(
        'Success',
        'Address added successfully!',
        [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]
      );
    } catch (error) {
      console.error('Error adding address: ', error);
  
      // Show error alert
      Alert.alert(
        'Error',
        'There was a problem adding the address. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };





  return (
    <View style={styles.container}>
      <ScrollView>
      <CreossButton title={String.Adrees} />
      
      <CustomTextInput
        style={styles.textinputview}
        placeholder="Address Title"
        placeholderTextColor={'#fff'}
        value={addresstitle}
        onChangeText={(addresstitle) => setAddresstitle(addresstitle)} />
          {errors.addresstitle && <Text style={styles.erroetext}>{errors.addresstitle}</Text>}
     
     <CustomTextInput
        style={styles.textinputview}
        placeholder="ZipCode"
        placeholderTextColor={'#fff'}
        value={zipcode}
        onChangeText={(zipcode) => setZipcode(zipcode)} />
          {errors.zipcode && <Text style={styles.erroetext}>{errors.zipcode}</Text>}
      <CustomTextInput
        style={styles.textinputview}
        mainviewstyle={styles.mainviewstyle}
        placeholder="Address"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        placeholderTextColor={'#fff'}
        value={address}
        onChangeText={(address) => setAddress(address)} />
          {errors.address && <Text style={styles.erroetext}>{errors.address}</Text>}

      <CustomTextInput
        style={styles.textinputview}
        placeholder="Unit Number"
        placeholderTextColor={'#fff'}
        value={Unitnumber}
         keyboardType="numeric"
        maxLength={10} 
        onChangeText={(Unitnumber) => setUnitNumber(Unitnumber)} />
          {errors.Unitnumber && <Text style={styles.erroetext}>{errors.Unitnumber}</Text>}
        <View style={styles.marbottom}/>
      <LongButton
        title={String.Save}
        onPress={addaddress}
      />
      </ScrollView>
    </View>


  )
}

export default Address

