import { ActivityIndicator, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { icons } from '../../Helper/icons';
import { String } from '../../Helper/string';
import { styles } from './styles';
import Headerviewbackarrow from '../../Componets/Headerviewbackarrow/Headerviewbackarrow';
import { firestore } from '../firebaseHelper';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
const ChatList = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [servicechatlist, setServiceChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState([]);
  const [fullname, setName] = useState('');

  useEffect(() => {
    const fetchLatestMessages = async () => {
      try {
        setLoading(true);

        // Fetch the latest messages from the 'chats' collection
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
        console.log('Fetching users...');
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
        console.log('Filtering latest messages per user...');
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
        console.log('Adding latest messages to the chatlist collection...');
        const chatlistCollection = firestore().collection('chatlist');
        await Promise.all(
          latestMessages.map((message) =>
            chatlistCollection.add({
              ...message,
              createdAt: firestore.FieldValue.serverTimestamp(), // Optional: Update the timestamp
            })
          )
        );
        console.log('Messages added to the chatlist collection');
        // Set the chat list state
        setServiceChatList(latestMessages);
        console.log('----<><><><><>', latestMessages)
        console.log()

      } catch (error) {
        console.error('Error fetching messages and users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMessages();
  }, []);
  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleModal1 = () => setModalVisible1(!modalVisible1);
  const toggleModal2 = () => setModalVisible2(!modalVisible2);
  const toggleModal3 = () => setModalVisible3(!modalVisible3);
  const toggleModal4 = () => setModalVisible4(!modalVisible4);

  return (
    <View style={styles.container}>
      <Headerviewbackarrow title={'Inbox'} />
      <ScrollView>
        <View style={styles.flexrow2}>
          <Text style={styles.chatstext}>{String.chats}</Text>
          {/* <View style={styles.unbermsgview} />
          <Text style={styles.twoundertext}>{String.twounder}</Text> */}
        </View>
        {loading && <ActivityIndicator size="large" color="#ffff" />}
        {servicechatlist.length > 0 && (
          <View>
            {servicechatlist.map((chat) => (
              <View key={chat.id} style={styles.flexrow3}>
                <TouchableOpacity
                  onPress={() => {
                    // Check if `chat` object is defined and has the required properties
                    if (chat) {
                      console.log('Navigating to ChatMag with data:', {
                        username: chat.username || 'Unknown User',
                        profileImage: chat.user.profileImage || icons.defaultProfile,
                        userId: chat.userId,
                        serviceId: chat.serviceId
                      });

                      navigation.navigate('ChatMag', {
                        username: chat.username || 'Unknown User',
                        profileImage: chat.profileImage || icons.defaultProfile,
                        serviceId: chat.serviceId,
                        userId: chat.userId,
                      });
                    } else {
                      console.warn('Chat object is not defined or lacks required properties.');
                    }
                  }}
                >
                  <Image source={{ uri: chat.profileImage || icons.defaultProfile }} style={styles.profileother2} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('ChatMag', {
                    username: chat.username || 'Unknown User',
                    profileImage: chat.profileImage || icons.defaultProfile,
                    serviceId: chat.serviceId,
                    userId: chat.userId,
                  })}
                  style={styles.chatDetails}
                >
                  <View style={styles.marleft}>
                    <Text style={styles.Celinetext}>{chat.username || 'Unknown User'}</Text>
                    <View style={styles.flexrow4}>
                      <Text numberOfLines={2} style={styles.Risetext}>{chat.text || String.NoMessage}</Text>
                      {chat.images && chat.images.length > 0 && (
                        <View style={styles.msgunder}>
                          <Text style={styles.msgnumber}>{chat.images.length}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                <Text style={styles.timetext}>{new Date(chat.createdAt.toDate()).toLocaleTimeString()}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.marbottom} />
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} swipeDirection={['right']}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={icons.protwo} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={modalVisible1} transparent={true} swipeDirection={['right']}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal1}>
            <Image source={icons.prothree} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={modalVisible2} transparent={true} swipeDirection={['right']}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal2}>
            <Image source={icons.profilefor} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={modalVisible3} transparent={true} swipeDirection={['right']}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal3}>
            <Image source={icons.prosixx} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ChatList;
