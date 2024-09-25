import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
// import firestore from '@react-native-firebase/firestore';
import { styles } from './Styles';
import HeaderComponets from '../../Componets/Header/HeaderComponets';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import Buttoncomponets from '../../Componets/Button/Buttoncomponets';
// import { auth, firestore } from '../firebaseHelper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Register = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  //  const handleRegistration = async () => {
  //     const newErrors = {};
  //     if (!fullname) newErrors.fullname = 'Please enter fullname';
  //     if (!email) newErrors.email = 'Please enter email';
  //     if (!password) newErrors.password = 'Please enter password';
  //     if (!phonenumber) newErrors.phonenumber = 'Please enter phonenumber';
  //     if (!confirmpass) newErrors.confirmpass = 'Please confirm your password';
  //     if (password && confirmpass && password !== confirmpass) newErrors.confirmpass = 'Passwords do not match';

  //     setErrors(newErrors);

  //     if (Object.keys(newErrors).length === 0) {
  //       setLoading(true);
  //       try {
  //          const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  //          const user = userCredential.user;
  //          await auth().createUserWithEmailAndPassword(email, password);

  //         // Add user data to Firestore
  //         await firestore().collection('Users').add({
  //           fullname: fullname,
  //           email: email,
  //           password: password ,
  //           phonenumber:phonenumber
  //         });

  //         Alert.alert('Success', 'User added successfully');
  //         setFullname('');
  //         setEmail('');
  //         setPassword('');
  //         setConfirmpass('');
  //         setPhonenumber('')
  //         navigation.navigate('LoginScreen');
  //       } catch (error) {
  //         Alert.alert('Error', error.message);
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };


  // const handleRegistration = async () => {
  //   const newErrors = {};

  //   // Validation checks
  //   if (!fullname) newErrors.fullname = 'Please enter fullname';
  //   if (!email) newErrors.email = 'Please enter email';
  //   if (!password) newErrors.password = 'Please enter password';
  //   if (!phonenumber) newErrors.phonenumber = 'Please enter phonenumber';
  //   if (!confirmpass) newErrors.confirmpass = 'Please confirm your password';
  //   if (password && confirmpass && password !== confirmpass) newErrors.confirmpass = 'Passwords do not match';

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) { // If no errors
  //     setLoading(true);
  //     try {
  //       // Create user with email and password
  //       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  //       const user = userCredential.user;

  //       // Add user data to Firestore with the user's unique ID
  //       await firestore().collection('Users').doc(user.uid).set({
  //         fullname: fullname,
  //         email: email,
  //         phonenumber: phonenumber,
  //         createdAt: firestore.FieldValue.serverTimestamp(), // Optional: to record creation time
  //       });

  //       // Success alert and navigation
  //       Alert.alert('Success', 'User added successfully');
  //       setFullname('');
  //       setEmail('');
  //       setPassword('');
  //       setConfirmpass('');
  //       setPhonenumber('');
  //       navigation.navigate('LoginScreen');
  //     } catch (error) {
  //       Alert.alert('Error', error.message);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };
  const handleRegistration = async () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format


    // Validation checks
    if (!fullname) newErrors.fullname = 'Please enter fullname';
    // if (!email) newErrors.email = 'Please enter email';
    //   if (!email) {
    //     newErrors.email = 'Please enter email';
    // } else if (!emailRegex.test(email)) {
    //     newErrors.email = 'Invalid email format';
    // }
    if (!password) newErrors.password = 'Please enter password';
    if (!phonenumber) {
      newErrors.phonenumber = 'Please enter phonenumber';
    } else if (!phoneRegex.test(phonenumber)) {
      newErrors.phonenumber = 'Invalid phone number format';
    }
    // if (!phonenumber) newErrors.phonenumber = 'Please enter phonenumber';
    if (!confirmpass) newErrors.isChecked = 'Please confirm your password';
    if (!isChecked) newErrors.isChecked = 'Please select your isChecked';
    if (password && confirmpass && password !== confirmpass) newErrors.confirmpass = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) { // If no errors
      setLoading(true);
      try {
        // Create user with email and password
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Prepare user data
        const userData = {
          fullname: fullname || '',
          email: email || '',
          phonenumber: phonenumber || '',
          // createdAt: firestore.FieldValue.serverTimestamp(),
        };
        console.log('userData ...', userData)
        // Add user data to Firestore with the user's unique ID
        await firestore().collection('Users').doc(user.uid).set(userData);

        Alert.alert('Success', 'User added successfully');
        setFullname('');
        setEmail('');
        setPassword('');
        setConfirmpass('');
        setPhonenumber('');
        navigation.navigate('LoginScreen');
      } catch (error) {
        if (error.message.includes('unsupported field value: undefined')) {
          Alert.alert('Error', 'One of the fields has an unsupported value. Please ensure all fields are filled correctly.');
        } else {
          Alert.alert('Invalid', 'An unexpected error occurred. Please try again');
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };



  // const handleRegistration = async () => {
  //   const newErrors = {};
  //   if (!fullname) newErrors.fullname = 'Please enter fullname';
  //   if (!email) newErrors.email = 'Please enter email';
  //   if (!password) newErrors.password = 'Please enter password';
  //   if (!phonenumber) newErrors.phonenumber = 'Please enter phonenumber';
  //   if (!confirmpass) newErrors.confirmpass = 'Please confirm your password';
  //   if (password && confirmpass && password !== confirmpass) newErrors.confirmpass = 'Passwords do not match';

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     setLoading(true);
  //     try {
  //       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  //       const user = userCredential.user;

  //       // Add user data to Firestore using the user's UID as the document ID
  //       await firestore().collection('Users').doc(user.uid).set({
  //         fullname: fullname,
  //         email: email,
  //         phonenumber: phonenumber,
  //       });

  //       Alert.alert('Success', 'User added successfully');
  //       setFullname('');
  //       setEmail('');
  //       setPassword('');
  //       setConfirmpass('');
  //       setPhonenumber('');
  //       navigation.navigate('LoginScreen');
  //     } catch (error) {
  //       Alert.alert('Error', error.message);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  // const handleRegistration = async () => {
  //   const newErrors = {};
  //   if (!fullname) newErrors.fullname = 'Please enter fullname';
  //   if (!email) newErrors.email = 'Please enter email';
  //   if (!password) newErrors.password = 'Please enter password';
  //   if (!phonenumber) newErrors.phonenumber = 'Please enter phonenumber';
  //   if (!confirmpass) newErrors.confirmpass = 'Please confirm your password';
  //   if (password && confirmpass && password !== confirmpass) newErrors.confirmpass = 'Passwords do not match';

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     setLoading(true);
  //     try {
  //       // Create user with email and password
  //       const userCredential = await auth().createUserWithEmailAndPassword(email, password,fullname,phonenumber);
  //       const user = userCredential.user;
  //       console.log(user)

  //       // Add user data to Firestore using UID as the document ID
  //       await firestore().collection('Users').doc(user.uid).set({
  //          fullname: fullname,
  //          email: email,
  //          password: password,
  //          phonenumber: phonenumber,
  //       });

  //        Alert.alert('Success', 'User added successfully');
  //       setFullname('');
  //       setEmail('');
  //       setPassword('');
  //       setConfirmpass('');
  //       setPhonenumber('');

  //       // Navigate to the ProfileScreen with the user UID
  //       navigation.navigate('LoginScreen');
  //     } catch (error) {
  //       Alert.alert('Error', error.message);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  // const handleRegistration = async () => {
  //   const newErrors = {};
  //   if (!fullname) newErrors.fullname = 'Please enter fullname';
  //   if (!email) newErrors.email = 'Please enter email';
  //   if (!password) newErrors.password = 'Please enter password';
  //   if (!phonenumber) newErrors.phonenumber = 'Please enter phonenumber';
  //   if (!confirmpass) newErrors.confirmpass = 'Please confirm your password';
  //   if (password && confirmpass && password !== confirmpass) newErrors.confirmpass = 'Passwords do not match';

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     setLoading(true);
  //     try {
  //       // Register the user
  //       const userCredential = await auth().createUserWithEmailAndPassword(email, password,password, phonenumber);
  //       const user = userCredential.user;

  //       // Add user data to Firestore using the user's UID as the document ID
  //       await firestore().collection('Users').doc(user.uid).set({
  //         fullname: fullname,
  //         email: email,
  //         password: password,
  //         phonenumber: phonenumber,
  //       });

  //       Alert.alert('Success', 'User added successfully');
  //       setFullname('');
  //       setEmail('');
  //       setPassword('');
  //       setConfirmpass('');
  //       setPhonenumber('');
  //       navigation.navigate('LoginScreen');
  //     } catch (error) {
  //       Alert.alert('Error', error.message);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };



  // const handleRegistration = async () => {
  //   const newErrors = {};

  //   if (!fullname) {
  //     newErrors.fullname = 'Please enter fullname';
  //   }
  //   if (!email) {
  //     newErrors.email = 'Please enter email';
  //   } 
  //   if (!phonenumber.trim() || phonenumber.length !== 10 || isNaN(phonenumber)) {
  //     newErrors.phonenumber = 'Please enter a valid 10-digit phone number';
  //   }

  //   if (!password) {
  //     newErrors.password = 'Please enter password';
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setErrors({});
  //   setLoading(true);

  //   try {
  //     // Create user with Firebase Authentication
  //     const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  //     const user = userCredential.user;

  //     // Save user data to Firestore
  //     await firestore().collection('Users').doc(user.uid).set({
  //       fullname: fullname,
  //       email: email,
  //       password: password,
  //       phonenumber: phonenumber,
  //     });

  //     // Registration successful
  //     Alert.alert('Registration Successful', 'You have been registered successfully.');
  //     navigation.navigate('LoginScreen', { user_id: user.uid });
  //   } catch (error) {
  //     // Handle errors
  //     if (error.code === 'email-already-in-use') {
  //       Alert.alert('Registration Error', 'This email address is already in use.');
  //     } else if (error.code === 'invalid-email') {
  //       Alert.alert('Registration Error', 'This email address is invalid.');
  //     } else if (error.code === 'weak-password') {
  //       Alert.alert('Registration Error', 'The password is too weak.');
  //     } else {
  //       Alert.alert('Registration Error', error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  // const handleRegistration = async () => {
  //   const newErrors = {};

  //   if (!fullname) {
  //     newErrors.fullname = 'Please enter fullname';
  //   }
  //   if (!email) {
  //     newErrors.email = 'Please enter email';
  //   } 
  //   if (!phonenumber.trim() || phonenumber.length !== 10 || isNaN(phonenumber)) {
  //     newErrors.phonenumber = 'Please enter a valid 10-digit phone number';
  //   }
  //   if (!password) {
  //     newErrors.password = 'Please enter password';
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setErrors({});
  //   setLoading(true);

  //   try {
  //     // Create user with Firebase Authentication
  //     const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  //     const user = userCredential.user;

  //     // Save user data to Firestore
  //     await firestore().collection('Users').doc(user.uid).set({
  //       fullname:fullname,
  //       email: user.email,
  //       password: user.password,
  //       phonenumber: phonenumber,
  //     });

  //     // Registration successful
  //     Alert.alert('Registration Successful', 'You have been registered successfully.');
  //     navigation.navigate('LoginScreen', { user_id: user.uid });
  //   } catch (error) {
  //     // Handle errors
  //     if (error.code === 'email-already-in-use') {
  //       Alert.alert('Registration Error', 'This email address is already in use.');
  //     } else if (error.code === 'invalid-email') {
  //       Alert.alert('Registration Error', 'This email address is invalid.');
  //     } else if (error.code === 'weak-password') {
  //       Alert.alert('Registration Error', 'The password is too weak.');
  //     } else {
  //       Alert.alert('Registration Error', error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderComponets title={String.create} IconName={icons.back} />
        <View style={styles.merbottom} />

        <View style={styles.fullview}>
          <View style={styles.mainview}>
            <View style={styles.flexrow}>
              <View style={styles.iconsview}>
                <Image source={icons.person} style={styles.user} />
              </View>
              <TextInput
                style={styles.textinputview}
                placeholder="Full name"
                placeholderTextColor={'#808080'}
                value={fullname}
                onChangeText={setFullname}
              />
            </View>
          </View>
          {errors.fullname && <Text style={styles.erroetext}>{errors.fullname}</Text>}

          <View style={styles.mainview}>
            <View style={styles.flexrow}>
              <View style={styles.iconsview}>
                <Image source={icons.email} style={styles.user1} />
              </View>
              <TextInput
                style={styles.textinputview}
                placeholder="Email"
                placeholderTextColor={'#808080'}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          {errors.email && <Text style={styles.erroetext}>{errors.email}</Text>}
          <View style={styles.mainview}>
            <View style={styles.flexrow}>
              <View style={styles.iconsview}>
                <Image source={icons.telephone} style={styles.user1} />
              </View>
              <TextInput
                style={styles.textinputview}
                placeholder="Phone Number"
                placeholderTextColor={'#808080'}
                keyboardType="numeric"
                maxLength={10}
                value={phonenumber}
                onChangeText={setPhonenumber}
              />
            </View>
          </View>
          {errors.phonenumber && <Text style={styles.erroetext}>{errors.phonenumber}</Text>}

          <View style={styles.mainview}>
            <View style={styles.flexrow}>
              <View style={styles.iconsview}>
                <Image source={icons.locked} style={styles.user1} />
              </View>
              <TextInput
                style={styles.textinputview}
                placeholder="Password"
                placeholderTextColor={'#808080'}

                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          {errors.password && <Text style={styles.erroetext}>{errors.password}</Text>}


          <View style={styles.mainview}>
            <View style={styles.flexrow}>
              <View style={styles.iconsview}>
                <Image source={icons.locked} style={styles.user1} />
              </View>
              <TextInput
                style={styles.textinputview}
                placeholder="Confirm Password"
                placeholderTextColor={'#808080'}
                secureTextEntry
                value={confirmpass}
                onChangeText={setConfirmpass}
              />
            </View>
          </View>
          {errors.confirmpass && <Text style={styles.erroetext}>{errors.confirmpass}</Text>}
        </View>

        <View style={styles.flexrow2}>
          <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
            <View style={[styles.checkbox, isChecked && styles.checked]}>
              {isChecked && <Text style={styles.checkmark}>&#10003;</Text>}
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>{String.iagree}</Text>
        </View>
        {errors.isChecked && <Text style={styles.erroetext}>{errors.isChecked}</Text>}
        {loading && <ActivityIndicator size="large" color="#c59619" />}

        <Buttoncomponets
          title={String.Register}
          onPress={handleRegistration}
        />

        <View style={styles.loginaccout}>
          <Text style={styles.label2}>{String.alreadyhaveanaccount} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.label3}>{String.login}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
