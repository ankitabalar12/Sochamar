import { Text, TouchableOpacity, View, Image, ScrollView, ImageBackground, SafeAreaView, TextInput, FlatList, Dimensions, Animated, } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { styles } from './styles'
import { icons } from '../../Helper/icons'
import { String } from '../../Helper/string'
import Searchcomponts from '../../Componets/Searchbar/Searchcomponts'
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactNativeModal from 'react-native-modal';
import { firestore } from '../firebaseHelper';
import { ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
const { height: screenHeight } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [name, setName] = useState()
  const [PhoneNumber, setPhoneNumber] = useState()
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState()
  const [modalVisibleBookService, setModalVisibleBookService] = useState()
  const [selectedService, setSelectedService] = useState(null);
  const colorOpacityModal = 0.9;
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState([]);
  const [banners, setbanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [address, setAddress] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rateings, setRateings] = useState('');
  const [time, setTime] = useState('');
  const [bookname, setBookname] = useState('');
  const [rateItems, setRateItems] = useState('');
  const [booking, setBooking] = useState([]);
  const [ratings, setRatings] = useState('')
  const [userid, setUser] = useState('')
  const [servicechatlist, setServiceChatList] = useState([]);
  const [averageRates, setAverageRates] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetTop = 100;
  const imageHeight = 300;
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, imageHeight],
    outputRange: [0, -imageHeight / 2],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, imageHeight / 2, imageHeight],
    outputRange: [1, 0.8, 0.6],
    extrapolate: 'clamp',
  });

  const ExampleComponent = ({ selectedService }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const imageHeight = 250; // Height of the header image
    const offsetTop = 30; // Top offset for the modal view
  }
  const modalViewTranslateY = scrollY.interpolate({
    inputRange: [0, imageHeight],
    outputRange: [offsetTop, offsetTop - (imageHeight / 2)],
    extrapolate: 'clamp',
  });
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
            // setAddress(userData.address || '');
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
    const fetchData = async () => {

      try {
        const categoriesData = await getCategories();
        console.log('Fetched Categories:', categoriesData);
        setCategories(categoriesData);
        const serviceData = await getService();
        console.log('Fetched Services:', serviceData);
        setService(serviceData);
        setFilteredData(serviceData);
        const bannerData = await getBanner();
        console.log('Fetched Services:', bannerData);
        setbanner(bannerData);
        const bookingData = await getBookservice();
        console.log('Fetched Categories:', bookingData);
        setBooking(bookingData);
        setTime(bookingData[0].time);
        setBookname(bookingData.name)
        console.log(bookingData[0].time)


        // const chatData = await fetchLatestMessages();
        // console.log('Fetched Services:', chatData);
        // setServiceChatList(chatData);
        // console.log('-------', chatData)


        // await getService();  // Fetch and set services
        // await loadRatesWithUserInfo();  // 
        const rateItems = await getAllRates();
        console.log('Fetched rate++++++++++++++:', rateItems);
        setRatings(rateItems);
        const calculateAverageRatesByService = (items) => {
          // Group items by serviceid
          const groupedRates = items.reduce((acc, item) => {
            if (!acc[item.serviceid]) {
              acc[item.serviceid] = [];
            }
            acc[item.serviceid].push(item.rate);
            return acc;
          }, {});
          const averageRates = Object.entries(groupedRates).map(([serviceid, rates]) => {
            const totalRate = rates.reduce((sum, rate) => sum + rate, 0);
            const averageRate = totalRate / rates.length;
            return {
              serviceid,
              averageRate: averageRate.toFixed(1), // Format to one decimal place
            };
          });

          return averageRates;
        };
        const averageRatesByService = calculateAverageRatesByService(rateItems);
        setAverageRates(averageRatesByService)
        console.log(averageRatesByService)
        console.log('Average Rates by Service:', averageRatesByService);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchProfile()
    fetchData();

  }, []);


  useEffect(() => {
    const filtered = service.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, service]);

  useFocusEffect(
    useCallback(() => {
      setSearchQuery('');
      setFilteredData(service);
    }, [service])
  );
  const getCategoryBackgroundColor = (index) => {
    return colors[index % colors.length];
  };
  const colors = [
    '#e0f7fa',
    '#e8f5e9',
    '#dbfdeb',
    '#ccffff',
    '#ccccff',
    '#ffffcc',
    '#cce6ff',
    '#d9e6f2',
    '#d9f2e6',
  ];
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

  const fetchLatestMessages = async () => {
    try {
      console.log('Fetching latest messages...');
  
      const messageSnapshot = await firestore()
        .collection('chats')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
  
      const messages = messageSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log('Fetched messages:', messages);
  
      const userSnapshot = await firestore().collection('users').get();
      const users = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log('Fetched users:', users);
  
      const userMap = users.reduce((map, user) => {
        map[user.id] = user;
        return map;
      }, {});
  
      console.log('User map:', userMap);
  
      const messagesWithUserDetails = messages.map((message) => ({
        ...message,
        user: userMap[message.userId] || {},
      }));
  
      console.log('Messages with user details:', messagesWithUserDetails);
  
      const latestMessagesMap = new Map();
      messagesWithUserDetails.forEach((message) => {
        if (
          !latestMessagesMap.has(message.user.userId) ||
          (message.createdAt && message.createdAt.toMillis() > latestMessagesMap.get(message.user.userId).createdAt.toMillis())
        ) {
          latestMessagesMap.set(message.user.userId, message);
        }
      });
  
      const latestMessages = Array.from(latestMessagesMap.values());
  
      console.log('Latest messages per user:', latestMessages);
  
      await Promise.all(
        latestMessages.map((message) =>
          firestore().collection('chatlist').add({
            ...message,
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
        )
      );
  
      console.log('Messages added to the chatlist collection');
  
      setServiceChatList(latestMessages);
      console.log('latestMessages ----------------------',)
  
      if (latestMessages.length > 0) {
        const { serviceId, username, profileImage, userId } = latestMessages[0];
  
        if (serviceId && username && profileImage && userId) {
          console.log('Navigating to ChatMag with data:', {
            serviceId,
            username,
            profileImage,
            userId,
          });
          navigation.navigate('ChatMag', {
            serviceId,
            username,
            profileImage,
            userId,
          });
        } else {
          console.log('One or more required fields are missing:', {
            serviceId,
            username,
            profileImage,
            userId,
          });
        }
      } else {
        console.log('No latest messages to navigate with.');
      }
    } catch (error) {
      console.error('Error fetching messages and users:', error);
    }
  };
  

  // Fetch chat data when component mounts or on some trigger
  // const fetchChatData = async () => {
  //   console.log('Fetching chat data...');
  //   const chatData = await fetchLatestMessages();
  //   console.log('Fetched Services:', chatData);
  // };




  const getService = async () => {
    try {
      const snapshot = await firestore().collection('service').get();
      const service = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Log each service object
      console.log('Service from Firestore:', service);

      // Log each service id separately
      service.forEach(service => {
        console.log('Service ID:', service.id);
      });

      // Extract all service IDs into an array
      const ids = service.map(service => service.id);
      global.ids = ids; // Storing IDs globally for later use
      console.log('All Service IDs:', ids);

      return service;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  };

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
    try {
      const user = auth().currentUser;
      const snapshot = await firestore()
        .collection('bookingservice')
        .where('userId', '==', user.uid)
        .get();

      console.log('snapshot <>', snapshot);
      const Bookservice = snapshot.docs.map(doc => {
        const bookingId = doc.id;
        global.bookingId = bookingId;
        console.log('Booking ID====:', bookingId);

        return {
          id: bookingId,
          ...doc.data(),
          date: formatTimestamp(doc.data().date),
          time: formatTimestamps(doc.data().time),
        };
      });

      console.log('All Bookservice data:', Bookservice);
      console.log('Book service from Firestore:', Bookservice);
      return Bookservice;
    } catch (error) {
      console.error('Error fetching Book service:', error);
      throw error;
    }
  };

  // const serviceId = service.id;
  // const averageRating = ratings[serviceId]?.average || '0.00';

  const getBanner = async () => {
    try {
      const snapshot = await firestore().collection('banner').get();
      const categories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('banner from Firestore:', categories);
      return categories;
    } catch (error) {
      console.error('Error fetching banner:', error);
      throw error;
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  const handleServicePress = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };
  const convertTimeToDecimal = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const decimalHours = hours + (minutes / 60) + (seconds / 3600);
    return decimalHours.toFixed(2) + " hour";
  };
  const timeString = "06:30:00";
  console.log(convertTimeToDecimal(timeString));

  const getAllRates = async () => {
    try {
      console.log('Global IDs:', global.ids); // Log the global IDs

      // Create an array of promises to fetch ratings for each service ID
      const ratingPromises = global.ids.map(serviceId =>
        firestore()
          .collection('rate')
          .where('serviceid', '==', serviceId)
          .get()
          .then(snapshot => snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })))
      );

      const ratingsArrays = await Promise.all(ratingPromises);
      const ratings = ratingsArrays.flat();


      const userPromises = ratings.map(rate =>
        firestore()
          .collection('users')
          .doc(rate.userid)
          .get()
          .then(userDoc => ({
            ...rate,
            user: userDoc.exists ? userDoc.data() : null,
          }))
      );


      const ratingsWithUsers = await Promise.all(userPromises);
      return ratingsWithUsers;
      // return averageRatings;
    } catch (error) {
      console.error('Error fetching ratings:', error);
      throw error;
    }
  };



  const getAverageRate = (serviceId) => {
    const rateObj = averageRates.find(rate => rate.serviceid === serviceId);
    return rateObj ? rateObj.averageRate : '0.0'; // Return 'N/A' if no rate is found
  };
  // const handleChatClick = (message) => {
  //   navigation.navigate('ChatMag', {
  //     userId: message.userId,
  //     serviceId: message.serviceId,
  //     username: message.username,
  //     usernameimgs: message.profileImage,
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.flexrow}>
        <TouchableOpacity style={styles.Profileview} onPress={() => navigation.navigate('Viewprofile')}>

          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.users}></Image>
          ) : (
            <Image source={icons.woman} style={styles.users} />
          )

          }
        </TouchableOpacity>
        <View>
          <View style={styles.flexrow2}>
            <Image source={icons.locationpin} style={styles.locationpin} />
            <Text style={styles.text2}>{address}</Text>
          </View>
          <Text style={styles.text}>{name}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ChatList')} style={styles.imges2}>
          <Image source={icons.chat} style={styles.bell} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imges} onPress={() => navigation.navigate('NotificationScreen')}>
          <Image source={icons.bell} style={styles.bell} />
          {/* {hasType2Messages && (
          <View style={{height:5, width:5, borderRadius:2, backgroundColor:'#4ceb34', position:"absolute", right:2, top:3}}></View>
          )} */}
        </TouchableOpacity>
      </View>
      <View style={styles.mainview}>
        <ScrollView>

          <View style={styles.mainview3}>
            <View style={styles.flexrow3}>
              <TouchableOpacity style={styles.margin}>
                <Image source={icons.search} style={styles.search} />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={'#c59619'}
                placeholder="Search services..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.marginbottom} />
          {!searchQuery && (
            <>
              <View style={styles.flexrow4}>
                <Text style={styles.Categories}>{String.Categories}</Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Categories');
                }}>
                  <Text style={styles.viewad}>{String.viewad}</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: '3%' }}>
                {categories.length === 0 ? (
                  <Text style={{ color: '#fff', }}>No categories found</Text>
                ) : (
                  categories.map((category, index) => (
                    <TouchableOpacity

                      onPress={() => {
                        navigation.navigate('ListOfServicesScreen', { categoryId: category.id });
                      }} style={styles.maincontainer}>
                      <View style={[styles.categroriesview, styles.categroriesview6, { backgroundColor: getCategoryBackgroundColor(index) }]}>
                        <Image source={{ uri: category.image }} style={styles.police} />
                      </View>
                      <Text style={styles.viewtext}>{category.name}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>

              <View style={styles.marginbottom} />

              <View style={styles.flexrow4}>
                <Text style={styles.Categories}>Offers</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Offer')}>
                  <Text style={styles.viewad}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.discountview2}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                  {banners.length === 0 ? (
                    <Text style={{ color: '#fff', }}>No Benners found</Text>
                  ) : (
                    banners.map(bannersitem => (
                      <View style={styles.discountItem}>
                        <View style={styles.flexrow3}>
                          <View>
                            <Text style={styles.textline}>{String.get}</Text>
                            <Text style={styles.textline2}>{bannersitem.name}</Text>
                            <Text style={styles.textline3}>{bannersitem.description}</Text>
                            <TouchableOpacity onPress={() => {
                              navigation.navigate('CreatAddNewCard', {
                                servicealldata: bannersitem.image,
                                serviceallid: bannersitem.id
                              })
                            }}
                            >
                              <View style={styles.buttonview}>
                                <Text style={styles.booknowtext}>{String.booknow}</Text>
                              </View>
                            </TouchableOpacity>

                          </View>
                          <Image source={{ uri: bannersitem.image }} style={styles.paintingman} />
                        </View>
                      </View>
                    ))
                  )}
                </ScrollView>
              </View>
              <View style={styles.marginbottom} />
              <View style={styles.flexrow4}>
                <Text style={styles.Categories}>{String.Featured}</Text>
                <TouchableOpacity>
                  <Text style={styles.viewad}>{String.viewad}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {loading && <ActivityIndicator size="large" color="#ffff" />}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: '3%' }}>
            {filteredData.length === 0 ? (
              <Text style={{ color: '#fff', alignSelf: 'center' }}>No service found</Text>
            ) : (
              filteredData.map(Homeservice => (
                <TouchableOpacity style={styles.maniviewtwo}
                  onPress={() => handleServicePress(Homeservice)}
                >
                  <View>
                    <Image source={{ uri: Homeservice.image }} style={styles.acreparing2} />
                    <View style={styles.bottonstyle}>
                      <Text style={styles.viewtext2}>{Homeservice.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
          <View style={styles.marginbott}></View>



        </ScrollView>
        <ReactNativeModal
          isVisible={modalVisible}
          backdropColor='#fff'
          backdropOpacity={colorOpacityModal}
          onBackdropPress={toggleModal}
          supportedOrientations={['portrait', 'landscape']}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['right']}
          onRequestClose={() => setModalVisible(false)}

          style={{ margin: 0, bottom: 0 }}
        >
          <View style={styles.maincontainertwo}>

            {selectedService && (
              <>
                <Animated.View style={[styles.backgroundImage, { height: imageHeight, transform: [{ translateY: imageTranslateY }] }]}>
                  {/* <Animated.View style={{ transform: [{ translateY: imageTranslateY }] }}> */}
                  <ImageBackground
                    source={{ uri: selectedService.image }}
                    style={[styles.backgroundImage, {

                    },]}

                  >
                    <View style={styles.overlay} />
                    <View style={styles.flerow}>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Image source={icons.leftarrow} style={styles.leftarrow} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={icons.like} style={styles.heart} />
                      </TouchableOpacity>
                    </View>

                  </ImageBackground>
                </Animated.View>

                <Animated.View style={[styles.modalviewstyle,
                {
                  // transform: [{ translateY: imageOpacity }]
                  transform: [{ translateY: modalViewTranslateY }],
                  top: offsetTop, // Keep the modal view offset from the top
                }
                ]}
                >
                  <Animated.ScrollView
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                      { useNativeDriver: true }
                    )}
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                  >
                    <ScrollView>
                      <View style={styles.flexrowd1}>
                        <Text style={styles.textstyle}>{selectedService.name}</Text>
                        <Text style={styles.textstyle2}>  (Office {selectedService.name})</Text>
                      </View>
                      <View style={styles.threeview}>
                        <View>
                          <Text style={styles.textstyle3}>{String.Rating} </Text>
                          <View style={styles.flexreow22}>
                            <Image source={icons.star} style={styles.star} />
                            {/* <Text style={styles.textstyle3}>{selectedService.averageRating}</Text> */}
                            <Text style={styles.textstyle3}>  {getAverageRate(selectedService.id)}</Text>
                          </View>
                        </View>

                        <View style={styles.centerview}></View>

                        <View>
                          <Text style={styles.textstyle3}>{String.Duration} </Text>
                          <Text style={styles.textstyle4}>{convertTimeToDecimal(time)}</Text>
                        </View>

                        <View style={styles.centerview}></View>
                        <View>
                          <Text style={styles.textstyle3}>{String.Price} </Text>
                          <Text style={styles.textstyle4}>{selectedService.price}</Text>
                        </View>
                      </View>

                      <Text style={styles.texttwofdf} numberOfLines={3}>{selectedService.description}</Text>
                      <Text style={styles.abiutprovi} >{String.abiutprovi}</Text>

                      {ratings.length === 0 ? (
                        <Text style={{ color: '#fff', alignSelf: 'center' }}>No Rating found</Text>
                      ) : (
                        ratings
                          .filter(ratingItem => ratingItem.serviceid === selectedService.id)
                          .map(ratingItem => (
                            <View key={ratingItem.id} style={styles.starview}>
                              <View style={styles.rowflex}>
                                <View style={styles.imgviewew}>
                                  {/* {ratingItem.user && ratingItem.user.profilePicture ? (
                                    <Image source={{ uri: ratingItem.profileImage }} style={styles.model} />
                                  ) : (
                                    <Image source={icons.profileuser} style={[styles.users, { tintColor: '#fff' }]} />
                                  )} */}

                                  {ratingItem.profileImage ? (
                                    <Image source={{ uri: ratingItem.profileImage }} style={styles.model} />
                                  ) : (
                                    <Image source={icons.profileuser} style={[styles.users, { tintColor: '#fff' }]} />
                                  )}
                                </View>
                                <View>
                                  <Text style={styles.Kristin}>{ratingItem.username}</Text>
                                  <View style={styles.starrow}>
                                    {Array.from({ length: 5 }, (_, index) => (
                                      <Image
                                        key={index}
                                        source={index < ratingItem.rate ? icons.star : null}
                                        style={styles.star1}
                                      />
                                    ))}
                                    {loading && <ActivityIndicator size="large" color="#ffff" />}
                                    {/* <Text style={{ color: '#ffff' }}>{ratingItem.rate}</Text> */}
                                  </View>
                                </View>
                                {/* <TouchableOpacity style={styles.rounfview}>
                                  <Image source={icons.found} style={styles.found} />
                                </TouchableOpacity> */}
                              </View>
                            </View>
                          ))
                      )}

                      <TouchableOpacity
                        onPress={() => {
                          fetchLatestMessages(selectedService.id); // Call the function on press
                        }}>
                        <View style={[styles.bookingbutton, styles.bookingbuttontwo]}>
                          <Text style={styles.textbooking}>Message</Text>
                        </View>
                      </TouchableOpacity>



                      <TouchableOpacity onPress={() => {
                        navigation.navigate('CreatAddNewCard', {
                          servicealldata: selectedService.image,
                          price: selectedService.price,
                          servicename: selectedService.name,
                          id: selectedService.id,
                        })
                        setModalVisibleBookService(false);

                        // setModalVisible(false)
                      }}>
                        <View style={[styles.bookingbutton, styles.bookingbuttontrr]}>
                          <Text style={styles.textbooking}>{String.booking}</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.marginbottcds}></View>
                    </ScrollView>
                  </Animated.ScrollView>
                </Animated.View>

              </>
            )}
            {/* </Animated.ScrollView> */}
          </View>
        </ReactNativeModal>
      </View>
    </View>
  )
}

export default Home






const getBookservice = async () => {
  try {
    // Fetch the current user
    const user = auth().currentUser;
    if (!user) {
      console.error('User not authenticated');
      throw new Error('User not authenticated');
    }

    console.log('Current User ID:', user.uid);

    // Fetch booking services for the user
    const bookingSnapshot = await firestore()
      .collection('bookingservice')
      .where('userId', '==', user.uid)
      .get();

    console.log('Booking Service Snapshot:', bookingSnapshot);

    const Bookservice = bookingSnapshot.docs.map(doc => {
      const bookingId = doc.id;
      global.bookingId = bookingId;
      console.log('Booking ID:', bookingId);

      const data = doc.data();
      console.log('Booking Service Data:', data);

      return {
        id: bookingId,
        ...data,
        date: formatTimestamp(data.date),
        time: formatTimestamps(data.time),
      };
    });

    console.log('All Booking Service Data:', Bookservice);

    // Fetch ratings for the services
    const serviceIds = Bookservice.map(service => service.id);
    console.log('Service IDs for Ratings:', serviceIds);

    const ratingsSnapshot = await firestore()
      .collection('rate')
      .where('serviceId', 'in', serviceIds)
      .get();

    console.log('Ratings Snapshot:', ratingsSnapshot);

    const ratings = ratingsSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      console.log('Rating Document Data:', data);

      if (!acc[data.serviceId]) {
        acc[data.serviceId] = [];
      }
      acc[data.serviceId].push(data.rate);
      return acc;
    }, {});

    console.log('Aggregated Ratings Data:', ratings);

    // Compute average ratings
    const averageRatings = Object.keys(ratings).reduce((acc, serviceId) => {
      const rates = ratings[serviceId];
      const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
      acc[serviceId] = average.toFixed(2);
      return acc;
    }, {});

    console.log('Average Ratings:', averageRatings);

    // Add ratings to booking services
    const BookserviceWithRatings = Bookservice.map(service => {
      const averageRating = averageRatings[service.id] || 'No Rating';
      console.log(`Adding Average Rating (${averageRating}) to Service ID: ${service.id}`);

      return {
        ...service,
        averageRating,
      };
    });

    console.log('All Booking Service Data with Ratings:', BookserviceWithRatings);

    return BookserviceWithRatings;
  } catch (error) {
    console.error('Error fetching Book service:', error);
    throw error;
  }
};

