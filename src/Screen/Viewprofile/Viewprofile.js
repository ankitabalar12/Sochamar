import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';
import CustomTextInput from '../../Componets/CustomTextInput/CustomTextInput';
import CreossButton from '../../Componets/CreossButton/CreossButton';
import LongButton from '../../Componets/LongButton/LongButton';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import { firestore, storage } from '../firebaseHelper';
import auth from '@react-native-firebase/auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './styles';


const Viewprofile = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [fullname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [imageUri, setImageUri] = useState(null);

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

  const selectImage = () => {
    Alert.alert('Alert', 'Choose an option', [
      {
        text: 'Back',
        onPress: () => {},
      },
      {
        text: 'Camera',
        onPress: openCamera,
      },
      {
        text: 'Library',
        onPress: openLibrary,
      },
    ]);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Camera permission denied');
      return;
    }

    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const uri = response.assets[0].uri;
        const url = await uploadImage(uri);
        setImageUri(url);
      }
    });
  };

  const openLibrary = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const uri = response.assets[0].uri;
        const url = await uploadImage(uri);
        setImageUri(url);
      }
    });
  };

  const uploadImage = async (uri) => {
    try {
      const user = auth().currentUser;
      if (user) {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const reference = storage().ref(`profileImages/${user.uid}/${filename}`);
        await reference.putFile(uri);
        return await reference.getDownloadURL();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleUpdateProfile = async () => {
    const newErrors = {};
    if (!fullname) newErrors.fullname = 'Please enter your name';
    if (!email) newErrors.email = 'Please enter your email';
    if (!phone) newErrors.phone = 'Please enter your mobile number';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const user = auth().currentUser;
        if (user) {
          await firestore().collection('Users').doc(user.uid).update({
            fullname,
            email,
            address,
            phonenumber: phone,
            profileImage: imageUri,
          });
          Alert.alert('Success', 'Profile updated successfully');
        } else {
          console.log('No authenticated user found');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'Failed to update profile');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <CreossButton title={'Edit profile'} />
        <TouchableOpacity onPress={selectImage} style={styles.viewstyle}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.woman} />
          ) : (
            <Image source={icons.woman} style={styles.woman} />
          )}
        </TouchableOpacity>

        <CustomTextInput
          style={styles.textinputview}
          placeholder="Name"
          placeholderTextColor={'#fff'}
          value={fullname}
          onChangeText={setName}
        />
        {errors.fullname && <Text style={styles.fullname}>{errors.fullname}</Text>}

        <CustomTextInput
          style={styles.textinputview}
          placeholder="Email"
          placeholderTextColor={'#fff'}
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.erroetext}>{errors.email}</Text>}

        <CustomTextInput
          style={styles.textinputview}
          placeholder="Mobile Number"
          placeholderTextColor={'#fff'}
          value={phone}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={setPhone}
        />
        {errors.phone && <Text style={styles.erroetext}>{errors.phone}</Text>}

        <CustomTextInput
          style={styles.textinputview}
          placeholder="Add Address"
          placeholderTextColor={'#fff'}
          value={address}
          onChangeText={setAddress}
        />
        {errors.address && <Text style={styles.address}>{errors.address}</Text>}

        {loading && <ActivityIndicator size="large" color="#ffff" />}
        <View style={styles.marbottom} />
        <LongButton title={String.Save} onPress={handleUpdateProfile} />
      </ScrollView>
    </View>
  );
};

export default Viewprofile;
