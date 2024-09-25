import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import HeaderComponets from '../../Componets/Header/HeaderComponets'
import Headerviewbackarrow from '../../Componets/Headerviewbackarrow/Headerviewbackarrow'
import { String } from '../../Helper/string'
import { icons } from '../../Helper/icons'
import { firestore } from '../firebaseHelper'
import auth from '@react-native-firebase/auth';
const NotificationScreen = ({ navigation }) => {
  const [notificationlist, setNotificationList] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notificationData = await getNotification();
        console.log('Fetched Services:', notificationData);
        setNotificationList(notificationData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getNotification = async () => {
    try {
      // Get the current user ID
      const user = auth().currentUser;
      if (!user) {
        throw new Error('No user is currently logged in.');
      }
  
      // Fetch notifications for the current user
      const notificationsSnapshot = await firestore()
        .collection('notifications')
        .where('userId', '==', user.uid) // Query to filter notifications by userId
        .get();
  
      // Check if there are any notifications
      if (notificationsSnapshot.empty) {
        console.log('No notifications found.');
        return;
      }
  
      // Process the notifications
      const notifications = notificationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log('Fetched notifications:', notifications);
  
      // You can now use `notifications` in your application state or UI
  
    } catch (error) {
      // Log error message
      console.error('Error fetching notifications:', error);
  
      Alert.alert(
        'Error',
        'There was a problem fetching notifications. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };
 return (
    <View style={styles.container}>
      <Headerviewbackarrow
        title={String.Notifi} />
      <ScrollView>
        <Text style={styles.todaytext}>{String.todat}</Text>

        <View style={styles.notflexrow}>
          <TouchableOpacity style={styles.notiproflview}>
            <View style={styles.notiproflview2}>
              <Image source={icons.image} style={styles.image} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.textstyleyou}>You have added WebUI.Img</Text>
              <View style={styles.notrowtwo}>
                <Image source={icons.turnright} style={styles.turnright} />
                <Text style={styles.dfsd}>/</Text>
                <Text style={styles.textstyleyou2}>Backup folder</Text>
                <Text style={styles.textstyleyou3}>2 Min Ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.marginview}></View>


        <View style={styles.notflexrow}>
          <TouchableOpacity style={styles.notiproflview}>
            <View style={[styles.notiproflview2, styles.notflexrow2]}>
              <Image source={icons.videocamera} style={styles.image} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.textstyleyou}>You have added WebUI.Img</Text>
              <View style={styles.notrowtwo}>
                <Image source={icons.turnright} style={styles.turnright} />
                <Text style={styles.dfsd}>/</Text>
                <Text style={styles.textstyleyou2}>Backup folder</Text>
                <Text style={styles.textstyleyou3}>2 Min Ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.marginview}></View>
        <Text style={styles.todaytext}>{String.twoday}</Text>


        <View style={styles.notflexrow}>
          <TouchableOpacity style={styles.notiproflview}>
            <View style={[styles.notiproflview2, styles.notflexrow3]}>
              <Image source={icons.musicalnote} style={styles.image} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.textstyleyou}>You have added WebUI.Img</Text>
              <View style={styles.notrowtwo}>
                <Image source={icons.turnright} style={styles.turnright} />
                <Text style={styles.dfsd}>/</Text>
                <Text style={styles.textstyleyou2}>Backup folder</Text>
                <Text style={styles.textstyleyou3}>2 Min Ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.marginview}></View>

        <View style={styles.notflexrow}>
          <TouchableOpacity style={styles.notiproflview}>
            <View style={styles.notiproflview2}>
              <Image source={icons.image} style={styles.image} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.textstyleyou}>You have added WebUI.Img</Text>
              <View style={styles.notrowtwo}>
                <Image source={icons.turnright} style={styles.turnright} />
                <Text style={styles.dfsd}>/</Text>
                <Text style={styles.textstyleyou2}>Backup folder</Text>
                <Text style={styles.textstyleyou3}>2 Min Ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.marginview}></View>
        <View style={styles.notflexrow}>
          <TouchableOpacity style={styles.notiproflview}>
            <View style={[styles.notiproflview2, styles.notflexrow2]}>
              <Image source={icons.videocamera} style={styles.image} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.textstyleyou}>You have added WebUI.Img</Text>
              <View style={styles.notrowtwo}>
                <Image source={icons.turnright} style={styles.turnright} />
                <Text style={styles.dfsd}>/</Text>
                <Text style={styles.textstyleyou2}>Backup folder</Text>
                <Text style={styles.textstyleyou3}>2 Min Ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.marginview}></View>
        <Text style={styles.todaytext}>{String.fiveday}</Text>
        <View style={styles.notflexrow}>
          <TouchableOpacity style={styles.notiproflview}>
            <View style={styles.notiproflview2}>
              <Image source={icons.image} style={styles.image} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.textstyleyou}>You have added WebUI.Img</Text>
              <View style={styles.notrowtwo}>
                <Image source={icons.turnright} style={styles.turnright} />
                <Text style={styles.dfsd}>/</Text>
                <Text style={styles.textstyleyou2}>Backup folder</Text>
                <Text style={styles.textstyleyou3}>2 Min Ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.marginview}></View>
        <View style={styles.notflexrow}>
          <TouchableOpacity style={styles.notiproflview}>
            <View style={[styles.notiproflview2, styles.notflexrow3]}>
              <Image source={icons.musicalnote} style={styles.image} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.textstyleyou}>You have added WebUI.Img</Text>
              <View style={styles.notrowtwo}>
                <Image source={icons.turnright} style={styles.turnright} />
                <Text style={styles.dfsd}>/</Text>
                <Text style={styles.textstyleyou2}>Backup folder</Text>
                <Text style={styles.textstyleyou3}>2 Min Ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.margierewdf}></View>
      </ScrollView>
    </View>
  )
}

export default NotificationScreen

{/* <TouchableOpacity onPress={() => navigation.navigate('Aboutus')}>
  <View style={styles.notiview}>
  <Image source={icons.found} style={styles.found} /> 
  </View>
  </TouchableOpacity>
  <Text style={styles.foundtext}>{String.Nodata}</Text> */}