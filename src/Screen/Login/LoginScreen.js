import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, BackHandler, ToastAndroid } from 'react-native';
import { styles } from './Styles';
import HeaderComponets from '../../Componets/Header/HeaderComponets';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import Buttoncomponets from '../../Componets/Button/Buttoncomponets';
import { auth, firestore, signUp } from '../firebaseHelper';
import { ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [showError, setShowError] = useState(false);
  const [backPressed, setBackPressed] = useState(0);

  const webviewRef = useRef(null);

  useEffect(() => {
    let update = true;

    const backAction = () => {
      if (update) {
        if (backPressed > 0) {
          BackHandler.exitApp();
        } else {
          if (webviewRef.current) {
            webviewRef.current.goBack();
            console.log('-------------', webviewRef.current)
          }
          setBackPressed(backPressed + 1);
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
          setTimeout(() => setBackPressed(0), 1000);
        }
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      update = false;
    };
  }, [backPressed]);
  // const handleLogin = async () => {
  //   const newErrors = {};
  //   if (!email) newErrors.email = 'Please enter your email';
  //   if (!password) newErrors.password = 'Please enter your password';

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length > 0) return;

  //   setLoading(true);
  //   try {
  //     const snapshot = await firestore()
  //       .collection('Users')
  //       .where('email', '==', email)
  //       .where('password', '==', password) 
  //       .get();

  //     if (snapshot.empty) {
  //       Alert.alert('Error', 'Invalid email or password');
  //       return;
  //     }

  //     Alert.alert(
  //       'Success',
  //       'Logged in successfully',
  //       [
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             setEmail('');
  //             setPassword('');
  //             navigation.navigate('Home'); // Replace 'Home' with your desired screen name
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   } catch (error) {
  //     Alert.alert('Error', error.message);
  //     setErrors(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const handleLogin = async () => {
  //   const newErrors = {};

  //   if (!email) {
  //     newErrors.email = 'Please enter name';
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

  //     const userCredential = await auth().signInWithEmailAndPassword(email, password);
  //     const user = userCredential.user;


  //     const userDoc = await firestore().collection('Users').doc(user.uid).get();
  //     if (userDoc.exists) {
  //       const userData = userDoc.data();

  //       // Store the user data in AsyncStorage
  //       await AsyncStorage.setItem('handleRegistration', JSON.stringify(userData));

  //       // Navigate to HomeScreen
  //       navigation.navigate('Home');
  //     } else {
  //       Alert.alert('User not found', 'No user data found in the database.');
  //     }
  //   } catch (error) {
  //     if (error.code === 'auth/invalid-email') {
  //       Alert.alert('Invalid Email', 'The email address is badly formatted.');
  //     } else if (error.code === 'auth/user-not-found') {
  //       Alert.alert('User Not Found', 'There is no user corresponding to this email.');
  //     } else if (error.code === 'auth/wrong-password') {
  //       Alert.alert('Incorrect Password', 'The password is invalid for the given email.');
  //     } else {
  //       Alert.alert('Login Error', error.message);
  //     }
  //     console.error('Login process error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //  const handleLogin = async () => {
  //   setLoading(true);
  //    try {
  //     await auth().signInWithEmailAndPassword(email, password);
  //     Alert.alert('Login Successful', 'You have been logged in successfully.');
  //   navigation.navigate('Home');
  //   } catch (error) {
  //     if (error.code === 'auth/wrong-password') {
  //       Alert.alert('Login Error', 'Incorrect password.');
  //     } else if (error.code === 'auth/user-not-found') {
  //       Alert.alert('Login Error', 'No user found with this email.');
  //     } else {
  //       Alert.alert('Login Error', error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Login Successful', 'You have been logged in successfully.');
        navigation.navigate('Home');
      })
      .catch(() => {
        // Show a generic invalid login message for any error
        Alert.alert('Login ', 'Invalid Login.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const Googlelogin = async () => {
    try {
      GoogleSignin.configure({
        webClientId: '939848304500-5utejoe1kq2i50nfmku4npq5uld0ploo.apps.googleusercontent.com',
        offlineAccess: true,
      });

      await GoogleSignin.hasPlayServices();

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with the Google credential in Firebase
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log(userCredential)
      // If you need to navigate or use any other functionality after login
      Alert.alert('Login Successful', 'You have been logged in successfully.');
      navigation.navigate('Home');

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Google Login Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play Services not available or outdated');
      } else {
        Alert.alert('Error', JSON.stringify(error));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.cantainer}>
      <ScrollView>
        <HeaderComponets
          title={String.login}
        />
        <Image source={icons.homeserviselogo} style={styles.logo} />
        <View style={styles.mainview}>
          <View style={styles.rowview}>
            <View style={styles.iconsview}>
              <Image source={icons.email} style={styles.mail} />
            </View>
            <TextInput
              placeholder=" Email"
              placeholderTextColor={'#c59619'}
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
        </View>
        {errors.email && <Text style={styles.erroetext}>{errors.email}</Text>}
        <View style={styles.mainview}>
          <View style={styles.rowview}>
            <View style={styles.iconsview}>
              <Image source={icons.password} style={styles.mail} />
            </View>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'#c59619'}
              value={password}
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>
        {errors.password && <Text style={styles.erroetext}>{errors.password}</Text>}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgottext}>{String.forget}</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#fff" />}

        <Buttoncomponets title={String.sigup}
          onPress={handleLogin}

        />

        <View style={{ alignSelf: 'center', marginTop: 20 }}><Text style={styles.forgottext2}>OR</Text></View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={Googlelogin} >
            <Image source={icons.google} style={styles.sociallogo} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.facebook} style={styles.sociallogo} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.apple} style={styles.sociallogo} />
          </TouchableOpacity>
        </View>

        <View style={styles.rowviwflex}>
          <Text style={styles.forgottext}>Don't have account? </Text>
          <TouchableOpacity style={styles.tex} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.forgottext2}> {String.Register}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
