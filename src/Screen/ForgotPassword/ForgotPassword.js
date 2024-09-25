import { Text, View ,Image, TextInput, Alert} from 'react-native'
import React,{useEffect, useState} from 'react'

import BackArrow from '../../Componets/BackArrow/BackArrow'
import { styles } from './Styles'
import { icons } from '../../Helper/icons'
import { String } from '../../Helper/string'

import Buttoncomponets from '../../Componets/Button/Buttoncomponets'
import { auth, firestore } from '../firebaseHelper'
import { ActivityIndicator } from 'react-native'
const ForgotPassword = ({navigation}) => {
const [email, setEmail] = useState();
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});
const [fullname, setName] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('')
const[Submitted,setSubmitted] = useState('')
// const [loading, setLoading] = useState(false);
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const documentSnapshot = await firestore().collection('Users').doc(user.uid).get();
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          await AsyncStorage.setItem('handleLogin', JSON.stringify(userData));

          setName(userData.fullname || '');
          setEmail(userData.email || '');
          setPhone(userData.phonenumber || '');
          setAddress(userData.address || '');
          setImageUri(userData.profileImage || null);
        } else {
          console.log('Document does not exist for UID:', user.uid);
        }
      } else {
        console.log('No authenticated user found');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);


const handleForgotPassword = () => {
  setSubmitted(true);
  console.log(email);

  if (email !== '') {
    auth()
      .sendPasswordResetEmail(email) // Correct usage for @react-native-firebase/auth
      .then(() => {
        Alert.alert('Success', 'A password reset link has been sent to your email.');
        navigation.navigate('LoginScreen'); // Navigate to Login screen after the reset link is sent
        setEmail(''); // Clear the email input
      })
      .catch((error) => {
        // Handle errors from Firebase
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          Alert.alert('The email address is not valid.');
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('No user found with this email.');
        } else {
          Alert.alert('An error occurred. Please try again later.');
        }
      });
  } else {
    Alert.alert('Please enter an email address.');
  }
};
  return (
    <View style={styles.caontainer}>
     <BackArrow/>
     <Image source={icons.password} style={styles.password} />
     <Text style={styles.forgottext}>{String.forget}</Text>
     <Text style={styles.forgottext2}>{String.Please}</Text>
     <View style={styles.mainview}>
        <View style={styles.rowview}>
          <View style={styles.iconsview}>
            <Image source={icons.email} style={styles.mail} />
          </View>
          <TextInput
            placeholder=" Enter Email"
            placeholderTextColor={'#c59619'}
            value={email}
            // keyboardType="numeric"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
      </View>
      {errors.email && <Text style={styles.erroetext}>{errors.email}</Text>}
      <Buttoncomponets
      title={String.send}
      onPress={handleForgotPassword}/>
        {loading && <ActivityIndicator size="large" color="#ffff" />}
    </View>
  )
}

export default ForgotPassword

