import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { styles } from './styles';
import HeaderComponets from '../../Componets/Header/HeaderComponets';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import LongButton from '../../Componets/LongButton/LongButton';
import { auth, firestore } from '../firebaseHelper';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
const CreatAddNewCard = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState(null); 
  const [showPicker, setShowPicker] = useState(false);
  const [date2, setDate2] = useState(null);
  const [showPicker2, setShowPicker2] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [Price, setPrice] = useState('');
  const { servicealldata, price, servicename, id,serviceallid } = route.params;
  console.log('servicealldata <>', servicealldata, price, servicename, id, serviceallid)
  const showDatepicker = () => setShowPicker(true);
  const showDatepicker2 = () => setShowPicker2(true);
  const [time, setTime] = useState(null);
  const [show, setShow] = useState(false);
  const [serviceId, setServiceId] = useState('');
  
 const[ rate, setRate] = useState('');
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Show loading indicator before fetching

      try {
        const user = auth().currentUser;
        if (user) {
          console.log('Current user UID:', user.uid);
          const documentSnapshot = await firestore().collection('Users').doc(user.uid).get();
          console.log('Document snapshot:', documentSnapshot);

          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            setName(userData.fullname || '');
            setEmail(userData.email || '');
            console.log('userData:', userData);

            // Save user data to AsyncStorage
            await AsyncStorage.setItem('handleLogin', JSON.stringify(userData));
          } else {
            console.log('Document does not exist for UID:', user.uid);
          }
        } else {
          console.log('No authenticated user found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Show error alert
        Alert.alert(
          'Error',
          'There was a problem fetching your profile. Please try again later.',
          [{ text: 'OK' }]
        );
      } finally {
        setLoading(false); // Hide loading indicator after fetching
      }
    };

    fetchProfile();
  }, []);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangetime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const addBooking = async () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Please enter your name';
    if (!address) newErrors.address = 'Please enter your address';
    if (!time) newErrors.time = 'Please enter your time';
    if (!date) newErrors.date = 'Please enter your date';
    if (!email) newErrors.email = 'Please enter your email';

    // If there are errors, show an alert and return early
    if (Object.keys(newErrors).length > 0) {
      let errorMessage = Object.values(newErrors).join('\n');
      Alert.alert('Validation Error', errorMessage);
      return;
    }

    try {
      // Get the current user ID
      const user = auth().currentUser;
      if (!user) {
        throw new Error('No user is currently logged in.');
      }
      const bookingRate = rate ?? 0; 
      await firestore()
        .collection('bookingservice')
        .add({
          name: name,
          address: address,
          service: servicename,
          date: date,
          email: email,
          serviceid: id,
          time: time,
          rate:bookingRate,
          images: servicealldata,
          price: price,
          userId: user.uid,
          status: 0,
          
         
        });

      Alert.alert(
        'Success',
        'Booking added successfully!',
        [
          { text: 'OK', onPress: () => navigation.navigate('Bookings') },
        ]
      );
    } catch (error) {
      console.error('Error adding booking: ', error);

      // Show error alert
      Alert.alert(
        'Error',
        'There was a problem adding the booking. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderComponets
          title={String.addnew}
          IconName={icons.back}
        />
        <View style={styles.matop} />
        <Text style={styles.cardname}>{String.cardname}</Text>
        <View style={styles.mainview}>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor={'#737373'}
            value={name}
            onChangeText={setName}
            style={styles.textslec}
          />
        </View>
        <Text style={styles.cardname}>{String.cardHolder}</Text>
        <View style={styles.mainview}>
          <TextInput
            placeholder="Enter your address"
            placeholderTextColor={'#737373'}
            value={address}
            onChangeText={setAddress}
            style={styles.textslec}
          />
        </View>
        <Text style={styles.cardname}>{String.email}</Text>
        <View style={styles.mainview}>
          <TextInput
            placeholder="Enter your Email"
            placeholderTextColor={'#737373'}
            value={email}
            onChangeText={setEmail}
            style={styles.textslec}
          />
        </View>

        <View style={styles.twoboxview}>
          <View>
            <Text style={styles.Exprired}>{String.startDate}</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <View style={styles.textboxview}>
                {date && (
                  <Text style={styles.selectedDate2}>{date.toLocaleDateString()}</Text>
                )}
                {!date && (
                  <Text style={styles.selectedDate}>Select Date</Text>
                )}
                {/* <Text style={styles.selectedDate}>
                  {date ? date.toLocaleDateString() : 'Select Date'}
                </Text> */}
                {/* <Text style={styles.selecteddate}>{date.toLocaleDateString()}</Text> */}
                {showPicker && (
                  <DateTimePicker
                    value={date || new Date()} // Default to current date if `date` is null
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.Exprired}>{String.Exprired}</Text>
            <TouchableOpacity onPress={showTimepicker}>
              <View style={styles.textboxview}>
                {/* <Text style={styles.selectedDate}>
                  {time ? time.toLocaleTimeString() : 'Select Time'}
                </Text> */}
                {time && (
                  <Text style={styles.selectedDate2}>{time.toLocaleTimeString()}</Text>
                )}
                {!time && (
                  <Text style={styles.selectedDate}>Select Time</Text>
                )}

                {show && (
                  <DateTimePicker
                    value={time || new Date()}
                    open={show}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangetime}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <LongButton
          title={String.addcard}
          confirmpayscreenbutton={styles.confirmpayscreenbutton}
          onPress={addBooking}
        />
      </ScrollView>
    </View>
  );
}

export default CreatAddNewCard;
