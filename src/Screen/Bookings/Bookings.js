import { Text, TouchableOpacity, View, Image, ScrollView, Animated, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import HeaderComponets from '../../Componets/Header/HeaderComponets'
import { String } from '../../Helper/string'
import { icons } from '../../Helper/icons'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ReactNativeModal from 'react-native-modal'
import Headerviewbackarrow from '../../Componets/Headerviewbackarrow/Headerviewbackarrow'
import { auth, firestore } from '../firebaseHelper'
import moment from 'moment'
import { ActivityIndicator } from 'react-native'
import { statusCodes } from '@react-native-google-signin/google-signin'

const Bookings = () => {
  const navigation = useNavigation();
  const [is_select, setSelect] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null)
  const [modalVisible1, setModalVisible1] = useState()
  const [modalVisible2, setModalVisible2] = useState()
  const colorOpacityModal = 0.9;
  const [selectedStars, setSelectedStars] = useState(0);
  const [text1, settext1] = useState(false)
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [address, setAddress] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedaccept, setSelectedAcc] = useState('');
  const [selectedacceptStatus, setSelectedAcceptStatus] = useState(null); // to store the selected status (1 or 2)
  const [isAdViewVisible, setIsAdViewVisible] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(null);
  // const [rateings, setRateings] = useState('');
  const [ratings, setRatings] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  // const [adViewVisible, setAdViewVisible] = useState({});
  // const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [visibleButtonId, setVisibleButtonId] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          console.log('Current user UID:', user.uid);
          const documentSnapshot = await firestore().collection('Users').doc(user.uid).get();
          console.log(documentSnapshot);
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            console.log('userData===:', userData);
            setFullName(userData.fullname || '');
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

    const fetchBookingData = async () => {
      try {
        const bookingData = await getBookservice();
        console.log('Fetched Categories:', bookingData);
        setBooking(bookingData);
        setFilteredData(bookingData);
        const categoriesData = await getCategories();
        setCategories(categoriesData)
        console.log('Fetched Categories:', categoriesData);
        await getrate();
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    const interval = setInterval(() => {
      setDaysToGo((prevDays) => prevDays - 1);
      setDaysToGo1((prevDays) => prevDays - 1);
      setDaysToGo2((prevDays) => prevDays - 1);
    }, 86400000);
    fetchProfile()
    fetchBookingData();
    // getrate()
    return () => clearInterval(interval);

  }, []);
  useEffect(() => {
    const filtered = booking.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);

  }, [searchQuery, booking]);
  useEffect(() => {
    const id = 1;
    selectcard(id);
  }, []);
  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return moment(timestamp.toDate()).format('ddd, DD MMM YYYY');
    }
    return timestamp;
  };

  const formatTimestamps = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return moment(timestamp.toDate()).format('HH:mm:ss');
    }
    return timestamp;
  };
  const getBookservice = async () => {

    const user = auth().currentUser;
    const snapshot = await firestore()
      .collection('bookingservice')
      .where('userId', '==', user.uid) // Filter by user ID
      .get();

    const Bookservice = snapshot.docs.map((doc) => {
      const bookingId = doc.id;
      const serviceId = doc.data().serviceid;
      global.bookingId = bookingId;
      global.serviceIdId = serviceId;

      return {
        id: bookingId,
        ...doc.data(),
        date: formatTimestamp(doc.data().date),
        time: formatTimestamps(doc.data().time),
      };
    });

    console.log('All Bookservice data:', Bookservice);
    // const updatedBookservice = Bookservice.map((booking) => {
    //   const matchingRate = ratings.find((rate) => rate.booking === booking.id);
    //   console.log('==============================', matchingRate)
    //   return {
    //     ...booking,
    //     rate: matchingRate ? matchingRate.rate : '',
    //   };
    // });
    const ratingsSnapshot = await firestore().collection('rate').get();
    const ratings = ratingsSnapshot.docs.map((doc) => doc.data());
    // const updatedBookservice = Bookservice.map((booking) => {
    //   const matchingRate = ratings.find((rate) => {
    //     console.log('Comparing rate.booking:', rate.serviceid, 'with booking.id:', booking.serviceid);
    //     return rate.serviceid === booking.serviceid;
    //   });
    //   console.log('Matching Rate:', matchingRate);
    //   console.log('Matching Rate:', ratings);

    //   return {
    //     ...booking,
    //     rate: matchingRate ? matchingRate.rate : '',
    //   };
    // });

    const updatedBookservice = Bookservice.map((booking) => {
      // Find the matching rate based on serviceid
      const matchingRate = ratings.find((rate) => {
        console.log('Comparing rate.serviceid:', rate.serviceid, 'with booking.serviceid:', booking.serviceid);
        return rate.serviceid === booking.serviceid;
      });

      // Log matching rates for debugging
      console.log('Matching Rate:', matchingRate);

      return {
        ...booking,
        rate: matchingRate && matchingRate.rate ? matchingRate.rate : '0', // Set default rate to '0.0' if no matching rate is found
      };
    });

    console.log('Updated Bookservice with rates:', updatedBookservice);
    console.log('Updated Bookservice with rates:', updatedBookservice);
    return updatedBookservice;

  };
  const getCategories = async () => {
    try {
      const snapshot = await firestore().collection('categories').get();
      const categories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Categories from Firestore:', categories);
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2)
  }
  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
  };

  const selectcard = async (id) => {
    setSelect(id)

  }
  const handleSubmit = () => {
    setModalVisible(false);
    setShowCompleteButton(true);
  };
  const handleShowAdView = () => {
    setIsAdViewVisible(true);

  };
  const handleServicePress = (bookitem) => {
    setSelectedService(bookitem);
    setVisibleButtonId(false);
    setIsButtonVisible(false);
    setModalVisible(true);
    // setIsButtonVisible(null); // Hide the button
    // setShowSubmitButton(true)
  };
  const handleRatingPress = (itemId, index) => {
    setSelectedStars(prev => ({
      ...prev,
      [itemId]: index + 1
    }));
  };
  const selctedaccreje = (id, status = 1) => {
    setSelectedAcc(id)
    setSelectedAcceptStatus(status);
    setIsAdViewVisible(false)
  }
  const handleRejectPress = (id, status) => {
    selctedaccreje(id, 2);
    setSelectedAcceptStatus(status);
    setIsAdViewVisible(false);
    setShowCompleteButton(false)
  };

  const ACRepair = Array.isArray(booking) ? booking.filter(item => item.service === 'AC Repair') : [];
  const Plumbing = Array.isArray(booking) ? booking.filter(item => item.service === 'Plumbing') : [];
  const filteredServices = selectedCategory ? Plumbing.filter(service => service.categoryId === selectedCategory) : Plumbing;



  const addrate = async () => {
    try {
      // Get the current user ID
      const user = auth().currentUser;
      if (!user) {
        throw new Error('No user is currently logged in.');
      }

      // Ensure selectedStars, text1, and selectedService.id are defined
      const rating = selectedStars[selectedService?.id] || 0; // Default to 0 if undefined
      const comment = text1 || ''; // Default to an empty string if undefined


      // Log the data to be submitted
      console.log('Submitting rating with the following data:');
      console.log('User ID:', user.uid);
      console.log('Comment:', comment);
      console.log('Rating:', rating);
      console.log('Service ID:', global.bookingId);

      // Add the rating to Firestore
      await firestore()
        .collection('rate')
        .add({
          userId: user.uid,
          text1: comment,
          rate: rating,
          username: fullname,
          profileImage: imageUri,
          booking: global.bookingId,
          serviceid: global.serviceIdId

        });
      // setIsRatingSubmitted(selectedService.id);
      setIsRatingSubmitted(prevState => ({
        ...prevState,
        [selectedService.id]: true,
      }));
      // setAdViewVisible(prev => ({ ...prev, [selectedService.id]: false }));
      // Log success message
      console.log('Rating submitted successfully.');
      // setSelectedStars(prevState => ({
      //   ...prevState,
      //   [global.bookingId]: rating
      // }));
      Alert.alert(
        'Success',
        'Rating submitted successfully!',
        [
          { text: 'OK', onPress: () => setModalVisible(false) },
        ]
      );
    } catch (error) {
      // Log error message
      console.error('Error adding rating: ', error);

      Alert.alert(
        'Error',
        'There was a problem submitting your rating. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };
  const getrate = async () => {
    try {
      // Log values before the query to ensure they are set
      console.log('Global Booking ID:', global.bookingId);
      console.log('Global Service ID:', global.serviceIdId);

      // Check if the values are valid
      if (!global.bookingId || !global.serviceIdId) {
        throw new Error('Booking ID or Service ID is missing.');
      }
      const ratingsSnapshot = await firestore()
        .collection('rate')
        .where('booking', '==', global.bookingId)
        .where('serviceid', '==', global.serviceIdId)
        .get();

      const fetchedRatings = ratingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRatings(fetchedRatings);
      console.log('Fetched Ratings ======ffgfgf=====cccc===:', fetchedRatings);

      fetchedRatings.forEach((rating) => {
        console.log('Rating ID:', rating.id);
        console.log('Booking ID:', rating.booking);
        console.log('Service ID:', rating.serviceid);
        console.log('Rate:', rating.rate);
      });

      setIsRatingSubmitted(true);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      Alert.alert(
        'Error',
        'There was a problem fetching ratings. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };

  // const getRatingForService = () => {
  //   return ratings.reduce((acc, rating) => {
  //     console.log('ratings=============', ratings)
  //     acc[rating.id] = rating.rate;
  //     return acc;
  //   }, {});

  // };
  // const ratingForService = getRatingForService();
  // console.log('Rating for the service=====lkldf===========:', ratingForService);





  return (
    <View style={styles.container}>
      <View style={styles.searchview}>
        <View style={styles.flexrow2}>
          <TouchableOpacity style={styles.margin}>
            <Image source={icons.search} style={styles.search} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={'#c59619'}
            placeholder="Search services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => {
            setModalVisible2(true)
          }} style={styles.sarchview}>
            <Image source={icons.list} style={styles.search2} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.threeviewflex}>
        <TouchableOpacity onPress={() => selectcard(1)} style={[styles.threeview, { backgroundColor: is_select === 1 ? '#c59619' : '#21242b' }]}>
          <View style={styles.flexrowone}>
            <Image source={icons.hand} style={[styles.hand, { tintColor: is_select === 1 ? '#fff' : '#999999' }]} />
            <Text style={[styles.allservicetext, { color: is_select === 1 ? '#fff' : '#999999' }]}>{String.allservice}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectcard(2)} style={[styles.threeview, { backgroundColor: is_select === 2 ? '#c59619' : '#21242b' }]}>
          <View style={styles.flexrowone}>
            <Image source={icons.airconditioner} style={[styles.hand, { tintColor: is_select === 2 ? '#fff' : '#999999' }]} />
            <Text style={[styles.allservicetext, { color: is_select === 2 ? '#fff' : '#999999' }]}>{String.Acservice}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectcard(3)} style={[styles.threeview, { backgroundColor: is_select === 3 ? '#c59619' : '#21242b' }]}>
          <View style={styles.flexrowone}>
            <Image source={icons.plumbing} style={[styles.hand, { tintColor: is_select === 3 ? '#fff' : '#999999' }]} />
            <Text style={[styles.allservicetext, { color: is_select === 3 ? '#fff' : '#999999' }]}>{String.plumbing}</Text>
          </View>
        </TouchableOpacity>

      </View>
      {is_select == '1' ? <View>
        <ScrollView>
          {filteredData.length === 0 ? (

            <Text style={{ color: '#fff', alignSelf: 'center' }}>No service found</Text>
          ) : (
            filteredData.map(bookitem => (
              <TouchableOpacity style={styles.maniviewtwo} key={bookitem.id}>
                <View>
                  <View style={styles.onescreenview}>
                    <View style={styles.flexrow2df}>
                      <View style={styles.imgview}>
                        <Image source={{ uri: bookitem.images }} style={styles.heirstyle} />
                      </View>
                      <View>
                        <Text style={styles.Jeanette}>{bookitem.name}</Text>
                        <View style={styles.locfexrow}>
                          <View style={styles.hetview}>
                            <Image source={icons.locationpin} style={styles.locationpin} />
                            <Text style={styles.abc}>{bookitem.address}</Text>
                          </View>
                          <View style={styles.width}>
                            <View style={styles.viewview}></View>
                            <Image source={icons.star} style={styles.star} />

                            <Text style={styles.abc2}>
                              {bookitem.rate !== '' && bookitem.rate != null
                                ? `${bookitem.rate}.0`
                                : '0.0'}
                            </Text>

                            {/* {ratingForService[bookitem.id] !== undefined
                                ? `${ratingForService[bookitem.id]}.0`
                                : '0.0'} */}
                            {/* <Text style={styles.abc2}>{getRatingForService(bookitem.serviceId)}</Text> */}
                            {/* {ratingForService[bookitem.id]}.0 */}
                            {/* {ratingForService[bookitem.id] ? `${ratingForService[bookitem.id]}.0` : '0.0'} */}

                            {/* <Text style={{ color: '#fff' }}>{bookitem.serviceId}</Text> */}
                            {/* <Text style={styles.abc3}>(532)</Text> */}
                          </View>
                        </View>
                        <View style={styles.marginview}></View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>{String.Service}</Text>
                          <Text style={styles.service2}>{bookitem.service}</Text>
                        </View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>{String.data}</Text>
                          <Text style={styles.service2}>{bookitem.date}</Text>
                        </View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>Time</Text>
                          <Text style={styles.service2}>{bookitem.time}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.marginview2}></View>
                    <View style={styles.flexrowbutton}>
                      <View style={styles.acceprejectbutton}>

                        {/* <TouchableOpacity
                          onPress={() => selctedaccreje(bookitem.id)}
                          style={[
                            styles.buttonviewrow,
                            styles.buttonviewrowtwo,
                            {
                              backgroundColor: bookitem.status === 1 || bookitem.status === 3 ? '#07ba0d' : '#000',
                              borderColor: bookitem.status === 1 || bookitem.status === 3 ? '#07ba0d' : '#c59619',
                            },
                          ]}
                        >
                          
                            {bookitem.status === 1
                              ? 'I made a book'
                              : bookitem.status === 3
                                ? 'Completed'
                                : 'Book'}
                          </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => selctedaccreje(bookitem.id)} style={[styles.buttonviewrow, styles.buttonviewrowtwo, {
                            backgroundColor: bookitem.status === 1 || bookitem.status === 3 || bookitem.status === 4 ? '#07ba0d' : '#000',
                            borderColor: bookitem.status === 1 || bookitem.status === 3 || bookitem.status === 4 ? '#07ba0d' : '#c59619',
                          }]} >
                          <Text style={styles.gotect}>
                            {bookitem.status === 1
                              ? 'I made a book'
                              : bookitem.status === 3
                                ? 'On going'
                                : bookitem.status === 4
                                  ? 'Completed'
                                  : 'Book'}
                          </Text>
                        </TouchableOpacity>



                        {/* 
                        {(bookitem.status === 1 || bookitem.status === 2) && selectedaccept === bookitem.id && selectedacceptStatus === 1 && (
                          <View style={styles.marviewright}>
                            <TouchableOpacity
                              onPress={() => handleShowAdView(bookitem.id)}
                              style={[
                                styles.buttonviewrow,
                                styles.buttonviewrowtwobufd,
                                {
                                  backgroundColor: isAdViewVisible ? '#07ba0d' : '#000',
                                  borderColor: isAdViewVisible ? '#000' : '#c59619',
                                },
                              ]}
                            >
                              <Text style={styles.gotect}>{String.OnGoing}</Text>
                            </TouchableOpacity>
                          </View>
                        )} */}

                      </View>
                      <Text style={styles.numberstyel}>{bookitem.price}</Text>
                    </View>
                    <View style={{ height: 8 }}></View>
                    {/* {bookitem.status === 4 &&  (
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem.id)}
                        style={styles.addview}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )} */}
                    {/* {bookitem.status === 4  && bookitem.rate === '0' && bookitem.rate == null && (
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem.id)}
                        style={styles.addview}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )} */}
                    {bookitem.status === 4 && (bookitem.rate == null || bookitem.rate === '0') && (
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem.id)}
                        style={styles.addview}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )}

                    {/* {bookitem.status === 4 && isButtonVisible === bookitem.id && (
                      <TouchableOpacity
                      onPress={() => handleServicePress(bookitem.id)}
                        style={styles.addview}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )} */}
                    {/* {bookitem.status === 4 && !isRatingSubmitted  &&(
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem.id)}
                        style={[styles.addview]}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )}  */}
                    {/* {bookitem.status === 4 && (
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem.id)}
                        style={[styles.addview]}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )}  */}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
          {loading && <ActivityIndicator size="large" color="#ffff" />}
          <ReactNativeModal
            isVisible={modalVisible}
            backdropColor='rgba(0, 0, 0, 0.5)'
            backdropOpacity={0.7}
            onBackdropPress={() => setModalVisible(false)}
            supportedOrientations={['portrait', 'landscape']}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection={['right']}
            onRequestClose={() => setModalVisible(false)}
            style={{ margin: 0, bottom: 0 }}
          >
            <View style={styles.mainviewmodal}>
              {selectedService && (
                <>
                  <View style={styles.flwxrowsdf}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.arrowstyle}>
                      <Image source={icons.back} style={styles.backArrow} />
                    </TouchableOpacity>
                    <Text style={styles.title2}>{String.rate}</Text>
                  </View>
                  <View style={styles.flexrwowfdds}>
                    <Text style={styles.rattext}>{String.rating}</Text>
                    <Text style={styles.selecnumber}> {selectedStars[selectedService.id] || '0'}.0</Text>
                    <Text style={styles.starnumver}> / 5</Text>
                  </View>
                  <View style={styles.starflexwrow}>
                    {[...Array(5).keys()].map((index) => (
                      <TouchableOpacity key={index} style={styles.margstar} onPress={() => handleRatingPress(selectedService.id, index)}>
                        <Image source={index < (selectedStars[selectedService.id] || 0) ? icons.star : icons.starline} style={[styles.selectedStar, index < (selectedStars[selectedService.id] || 0) && styles.startwo]} />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Write your comment..."
                    placeholderTextColor={'#fff'}
                    value={text1}
                    onChangeText={settext1}
                  />
                  <View style={styles.buttomviewhe}></View>

                  {loading && <ActivityIndicator size="large" color="#ffff" />}
                  {/* {isRatingSubmitted && ( */}
                  <TouchableOpacity style={styles.sbmitview} onPress={addrate}>
                    <Text style={styles.submitview}>{String.submit}</Text>
                  </TouchableOpacity>
                  {/* )} */}
                </>
              )}
            </View>
          </ReactNativeModal>
          <View style={styles.marginviewrtr}></View>
        </ScrollView>

      </View> : null}

      {is_select == '2' ? (<View>
        <ScrollView>
          {loading && <ActivityIndicator size="large" color="#ffff" />}
          {ACRepair.length === 0 ? (
            <Text style={{ color: '#fff', alignSelf: 'center' }}>No Ac service found</Text>
          ) : (
            ACRepair.map(bookitem => (
              <TouchableOpacity style={styles.maniviewtwo}
              // onPress={() => handleServicePress(booking)}
              >
                <View>
                 <View style={styles.onescreenview}>
                    <View style={styles.flexrow2df}>
                      <View style={styles.imgview}>
                        <Image source={{ uri: bookitem.images }} style={styles.heirstyle} />
                      </View>
                      <View>
                        <Text style={styles.Jeanette}>{bookitem.name}</Text>
                        <View style={styles.locfexrow}>
                          <View style={[styles.hetview]}>
                            <Image source={icons.locationpin} style={styles.locationpin} />
                            <Text style={styles.abc}>{bookitem.address}</Text>
                          </View>
                          <View style={styles.width}>
                            <View style={styles.viewview}></View>
                            <Image source={icons.star} style={styles.star} />
                            {/* <Text style={styles.abc2}>{selectedStars[bookitem.id] || '0'}.4</Text> */}
                            <Text style={styles.abc2}>
                              {bookitem.rate !== '' && bookitem.rate != null
                                ? `${bookitem.rate}.0`
                                : '0.0'}
                            </Text>

                            {/* <Text style={styles.abc3}>(532)</Text> */}
                          </View>
                        </View>
                        <View style={styles.marginview}></View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>{String.Service}</Text>
                          <Text style={styles.service2}>{bookitem.service}</Text>
                        </View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>{String.data}</Text>
                          <Text style={styles.service2}>{bookitem.expirdate}</Text>
                        </View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>Time</Text>
                          <Text style={styles.service2}>{bookitem.time}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.marginview2}></View>
                    <View style={styles.flexrowbutton}>

                      <View style={styles.acceprejectbutton}>
                      <TouchableOpacity
                          onPress={() => selctedaccreje(bookitem.id)} style={[styles.buttonviewrow, styles.buttonviewrowtwo, {
                            backgroundColor: bookitem.status === 1 || bookitem.status === 3 || bookitem.status === 4 ? '#07ba0d' : '#000',
                            borderColor: bookitem.status === 1 || bookitem.status === 3 || bookitem.status === 4 ? '#07ba0d' : '#c59619',
                          }]} >
                          <Text style={styles.gotect}>
                            {bookitem.status === 1
                              ? 'I made a book'
                              : bookitem.status === 3
                                ? 'On going'
                                : bookitem.status === 4
                                  ? 'Completed'
                                  : 'Book'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.numberstyel}>{bookitem.price}</Text>
                    </View>
                    {bookitem.status === 4 && (bookitem.rate == null || bookitem.rate === '0') && (
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem.id)}
                        style={styles.addview}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )}

                    {/* <View style={{ height: 8 }}></View>
                    {selectedaccept === bookitem.id && selectedacceptStatus === 1 && (
                      <View style={styles.marviewright}>
                        <TouchableOpacity onPress={handleShowAdView}
                          style={[styles.buttonviewrow, styles.buttonviewrowtwobu, {
                            backgroundColor: '#07ba0d',
                            borderColor: '#07ba0d',
                          }]}
                        >
                          <Text style={styles.gotect}>{String.OnGoing}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={{ height: 8 }}></View>
                    {isAdViewVisible && (
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem)}
                        style={styles.addview}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )}

                    {showCompleteButton && (
                      <TouchableOpacity style={styles.compaletedbutton}>
                        <Text style={styles.gotect}>Complete</Text>
                      </TouchableOpacity>
                    )} */}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
          <View style={styles.marginviewrtr}></View>
        </ScrollView>
      </View>) : null}
      {is_select == '3' ? (<View>
        {loading && <ActivityIndicator size="large" color="#ffff" />}
        <ScrollView>
          {Plumbing.length === 0 ? (
            <Text style={{ color: '#fff', alignSelf: 'center' }}>No Plumbing found</Text>
          ) : (
            Plumbing.map(bookitem => (
              <TouchableOpacity style={styles.maniviewtwo}
              // onPress={() => handleServicePress(booking)}
              >
                      <View>
                 <View style={styles.onescreenview}>
                    <View style={styles.flexrow2df}>
                      <View style={styles.imgview}>
                        <Image source={{ uri: bookitem.images }} style={styles.heirstyle} />
                      </View>
                      <View>
                        <Text style={styles.Jeanette}>{bookitem.name}</Text>
                        <View style={styles.locfexrow}>
                          <View style={[styles.hetview]}>
                            <Image source={icons.locationpin} style={styles.locationpin} />
                            <Text style={styles.abc}>{bookitem.address}</Text>
                          </View>
                          <View style={styles.width}>
                            <View style={styles.viewview}></View>
                            <Image source={icons.star} style={styles.star} />
                            {/* <Text style={styles.abc2}>{selectedStars[bookitem.id] || '0'}.4</Text> */}
                            <Text style={styles.abc2}>
                              {bookitem.rate !== '' && bookitem.rate != null
                                ? `${bookitem.rate}.0`
                                : '0.0'}
                            </Text>

                            {/* <Text style={styles.abc3}>(532)</Text> */}
                          </View>
                        </View>
                        <View style={styles.marginview}></View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>{String.Service}</Text>
                          <Text style={styles.service2}>{bookitem.service}</Text>
                        </View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>{String.data}</Text>
                          <Text style={styles.service2}>{bookitem.expirdate}</Text>
                        </View>
                        <View style={styles.flexdirection}>
                          <Text style={styles.service}>Time</Text>
                          <Text style={styles.service2}>{bookitem.time}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.marginview2}></View>
                    <View style={styles.flexrowbutton}>

                      <View style={styles.acceprejectbutton}>
                      <TouchableOpacity
                          onPress={() => selctedaccreje(bookitem.id)} style={[styles.buttonviewrow, styles.buttonviewrowtwo, {
                            backgroundColor: bookitem.status === 1 || bookitem.status === 3 || bookitem.status === 4 ? '#07ba0d' : '#000',
                            borderColor: bookitem.status === 1 || bookitem.status === 3 || bookitem.status === 4 ? '#07ba0d' : '#c59619',
                          }]} >
                          <Text style={styles.gotect}>
                            {bookitem.status === 1
                              ? 'I made a book'
                              : bookitem.status === 3
                                ? 'On going'
                                : bookitem.status === 4
                                  ? 'Completed'
                                  : 'Book'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.numberstyel}>{bookitem.price}</Text>
                    </View>
                    {bookitem.status === 4 && (bookitem.rate == null || bookitem.rate === '0') && (
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem.id)}
                        style={styles.addview}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )}

                    {/* <View style={{ height: 8 }}></View>
                    {selectedaccept === bookitem.id && selectedacceptStatus === 1 && (
                      <View style={styles.marviewright}>
                        <TouchableOpacity onPress={handleShowAdView}
                          style={[styles.buttonviewrow, styles.buttonviewrowtwobu, {
                            backgroundColor: '#07ba0d',
                            borderColor: '#07ba0d',
                          }]}
                        >
                          <Text style={styles.gotect}>{String.OnGoing}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={{ height: 8 }}></View>
                    {isAdViewVisible && (
                      <TouchableOpacity
                        onPress={() => handleServicePress(bookitem)}
                        style={styles.addview}
                      >
                        <Text style={styles.addviewtext}>{String.adview}</Text>
                      </TouchableOpacity>
                    )}

                    {showCompleteButton && (
                      <TouchableOpacity style={styles.compaletedbutton}>
                        <Text style={styles.gotect}>Complete</Text>
                      </TouchableOpacity>
                    )} */}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
        <View style={styles.marginviewrtr}></View>
      </View>) : null}
      <ReactNativeModal
        isVisible={modalVisible2}
        onBackdropPress={toggleModal2}
        transparent={true}
        backdropColor={'#fff'}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={{ margin: 0, bottom: 0 }}
        backdropOpacity={0}
      >

        <View style={styles.backcoloeview}>
          <View style={styles.profileflexrow}>
            <View style={styles.profilview}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.profilview}></Image>
              ) : (
                <Image source={icons.woman} style={styles.profilview} />
              )

              }
            </View>
            <Text style={styles.textstyle}>{fullname}</Text>
          </View>
          <View style={styles.hegitviewmar}></View>
          {categories.length === 0 ? (
            <Text style={{ color: '#fff', }}>No categories found</Text>
          ) : (
            categories.map((category, index) => (
              <View>
                <TouchableOpacity onPress={() => {
                  handleCategoryPress(category);
                  setModalVisible2(false)
                  navigation.navigate('ListOfServicesScreen', { categoryId: category.id });
                }}>
                  <View style={styles.flexrowviewsty}>
                    <View style={[styles.dosts, { backgroundColor: selectedCategory === category.id ? '#c59619' : '#fff' }]}></View>
                    <Text style={[styles.categroiestext, { color: selectedCategory === category.id ? '#c59619' : '#fff' }]}>{category.name}</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ height: 1, width: '100%', backgroundColor: '#fff' }}></View>
                {/* <View style={styles.marctagroriesview} /> */}
              </View>
            ))
          )}
          {/* <Text style={styles.categroiestext}>{category.name}</Text> */}
        </View>
      </ReactNativeModal>





    </View>

  )
}

export default Bookings

{/* <View style={styles.flexrow}>
<TouchableOpacity
  style={styles.backButton}>
  <Image source={icons.back} style={styles.backArrow} />
</TouchableOpacity>
<Text style={styles.title}>{String.mybookig}</Text>
<Image source={icons.date} style={styles.backArrow} />
</View> */}


