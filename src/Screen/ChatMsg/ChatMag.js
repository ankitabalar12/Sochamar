import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList, Alert, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { icons } from '../../Helper/icons'
import { useNavigation } from '@react-navigation/native'
import ReactNativeModal from 'react-native-modal'
import { String } from '../../Helper/string'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { firestore } from '../firebaseHelper'
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-community/async-storage'
const ChatMag = ({ route }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [modalVisible, setModalVisible] = useState()
  const [modalVisible2, setModalVisible2] = useState()
  const colorOpacityModal = 0.9;
  const [fullname, setName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const { serviceId, username, profileImage, userId, } = route.params;
  console.log('servicealldata <>', serviceId, username, profileImage, userId)
  const scrollViewRef = useRef();


  const handleBackPress = () => {
    navigation.goBack();
  };

  const fetchMessages = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        console.error('No user is currently logged in.');
        return;
      }

      const snapshot = await firestore()
        .collection('chats')
        .where('userId', '==', user.uid)
        .where('serviceId', '==', serviceId)
        .get();

      const serviceschat = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(serviceschat);
      console.log('serviceschat from Firestore:', serviceschat);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const documentSnapshot = await firestore()
            .collection('Users')
            .orderBy('createdAt', 'desc')
            .doc(user.uid)
            .get();
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            await AsyncStorage.setItem('handleLogin', JSON.stringify(userData));
            setName(userData.fullname || '');
            setImageUri(userData.profileImage || null);
          } else {
            console.log('Document does not exist for UID:', user.uid);
          }
        } else {
          console.log('No authenticated user found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        console.error('No user is currently logged in.');
        return;
      }

      if (messageText.trim().length === 0) {
        console.warn('Message text is empty. Not sending.');
        return;
      }

      const newMessage = {
        text: messageText.trim(),
        serviceId: serviceId,
        userId: user.uid,
        username: username,
        profileImage: profileImage,
        sender: 'User 1',
        createdAt: firestore.Timestamp.now(),
        images: selectedImages,
        types:1
      };

      await firestore().collection('chats').add(newMessage);

      console.log('Message sent successfully');

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageText('');
      setSelectedImages([]);

      console.log('Message input and selected images cleared');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


 
  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2)
  }
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
        saveToPhotos: true,
      },
      (response) => {
        if (!response.didCancel && !response.error) {
          setSelectedImages([...selectedImages, response.uri]);
        }
      }
    );
  };

  const openLibrary = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 4 - selectedImages.length,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        const newImages = response.assets.map((asset) => asset.uri);
        setSelectedImages([...selectedImages, ...newImages]);
      }
    });
  };
  const selectImage = () => {
    Alert.alert('Alert', 'Choose an option', [
      {
        text: 'Back',
        onPress: () => { },
      },
      {
        text: 'Camera',
        onPress: () => openCamera(),
      },
      {
        text: 'Library',
        onPress: () => openLibrary(),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.maniview}>
        <View style={styles.flexrow1}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image source={icons.back} style={[styles.back2]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setModalVisible2(true)
          }}>
            <Image source={icons.settings} style={styles.back} />
          </TouchableOpacity>
        </View>


        <View style={styles.profileview}>
          <View style={styles.proview}>
            <Image source={{ uri: profileImage }} style={styles.proview} />
            {/* <Text style={{color:'#fff'}}>{servicealldata}</Text> */}
          </View>
          <Text style={styles.usertext}>{username}</Text>
          {/* <TouchableOpacity style={styles.position}>
            <Image source={icons.video} style={styles.video} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.position2}>
            <Image source={icons.telephone} style={styles.telephone} />
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} bounces={false} >
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <View
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: item.sender === 'User 1' ? '#DCF8C6' : '#E5E5EA',
                    alignSelf: item.sender === 'User 1' ? 'flex-end' : 'flex-start',
                  },
                ]}
              >
                {item.text ? <Text>{item.text}</Text> : null}
                {Array.isArray(item.images) && item.images.length > 0 && item.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={styles.messageImage} />
                ))}
              </View>
              <Text style={styles.messageTime}>
                {item.createdAt ? item.createdAt.toDate().toLocaleTimeString() : 'Loading...'}
              </Text>
            </View>
          )}
          inverted
        />
      </ScrollView>


      <View style={styles.margintopview}></View>
      <View style={styles.flexdr}>
        <View style={styles.sendmsgview}>
          <View style={styles.flexrow1msg}>
            <TouchableOpacity onPress={selectImage}>
              <Image source={icons.photo} style={styles.photo} />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor={'#fff'}
              value={messageText}
              onChangeText={(text) => setMessageText(text)}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.msgsendsty}>
              <Image source={icons.send} style={styles.sendtwo} />
            </TouchableOpacity>

          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addallview}>
          <Image source={icons.plus} style={styles.plus} />
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        isVisible={modalVisible}
        backdropColor='rgba(0, 0, 0, 0.5)'
        backdropOpacity={colorOpacityModal}
        onBackdropPress={toggleModal}
        supportedOrientations={['portrait', 'landscape']}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['right']}
        onRequestClose={() => setModalVisible(false)}

        style={{ margin: 0, bottom: 0 }}
      >
        <View style={styles.mainviewstyles}>
          <View style={styles.flexroefour}>
            <View>
              <TouchableOpacity style={styles.viewaddstyle}>
                <Image source={icons.document} style={styles.document} />
              </TouchableOpacity>
              <Text style={styles.documenttext}>{String.Document}</Text>
            </View>

            <View>
              <TouchableOpacity onPress={selectImage} style={[styles.viewaddstyle, styles.viewaddstyle2]}>
                <Image source={icons.photo} style={styles.document} />
              </TouchableOpacity>
              <Text style={[styles.documenttext, styles.documenttext2]}>{String.Camera}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={selectImage} style={[styles.viewaddstyle, styles.viewaddstyle3]}>
                <Image source={icons.imageone} style={styles.document} />
              </TouchableOpacity>
              <Text style={styles.documenttext}>{String.galeryy}</Text>
            </View>
          </View>



          <View style={styles.flexroefour}>
            <View>
              <TouchableOpacity style={[styles.viewaddstyle, styles.viewaddstyle4]}>
                <Image source={icons.headphones} style={styles.document} />
              </TouchableOpacity>
              <Text style={styles.documenttext}>{String.audio}</Text>
            </View>
            <View>
              <TouchableOpacity style={[styles.viewaddstyle, styles.viewaddstyle5]}>
                <Image source={icons.pin} style={styles.document} />
              </TouchableOpacity>
              <Text style={styles.documenttext}>{String.location}</Text>
            </View>
            <View>
              <TouchableOpacity style={[styles.viewaddstyle, styles.viewaddstyle6]}>
                <Image source={icons.rupeesymbol} style={styles.document} />
              </TouchableOpacity>
              <Text style={styles.documenttext}>{String.Payment}</Text>
            </View>
          </View>
          <View style={[styles.flexroefour2]}>
            <View>
              <TouchableOpacity style={[styles.viewaddstyle, styles.viewaddstyle7]}>
                <Image source={icons.user} style={styles.document} />
              </TouchableOpacity>
              <Text style={styles.documenttext}>{String.contact}</Text>
            </View>
            <View>
              <TouchableOpacity style={[styles.viewaddstyle, styles.viewaddstyle8]}>
                <Image source={icons.poll} style={styles.document} />
              </TouchableOpacity>
              <Text style={styles.documenttext}>{String.Poll}</Text>
            </View>
          </View>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={modalVisible2}
        backdropColor='rgba(0, 0, 0, 0.5)'
        backdropOpacity={colorOpacityModal}
        onBackdropPress={toggleModal2}
        supportedOrientations={['portrait', 'landscape']}
        onSwipeComplete={() => setModalVisible2(false)}
        swipeDirection={['right']}
        onRequestClose={() => setModalVisible2(false)}

        style={{ margin: 0, bottom: 0 }}
      >
        <TouchableOpacity onPress={() => {
          setModalVisible2(false);
          navigation.navigate('ProfileScreen')
        }} style={styles.modalviewstyle}>
          <Text style={styles.textprostyle}>profile</Text>
        </TouchableOpacity>
      </ReactNativeModal>
    </View>
  )
}

export default ChatMag

