import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { styles } from './styles'
import Headerviewbackarrow from '../../Componets/Headerviewbackarrow/Headerviewbackarrow'
import { String } from '../../Helper/string'
import { icons } from '../../Helper/icons'
import auth from '@react-native-firebase/auth';
import { firestore } from '../firebaseHelper'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'


const ProfileScreen = ({navigation}) => {
    const [fullname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [imageUri, setImageUri] = useState(null);
    
    // useEffect(() => {
    //     const fetchProfile = async () => {
    //       try {
    //         const user = auth().currentUser;
    //         if (user) {
    //           console.log('Current user UID:', user.uid);
    //           const documentSnapshot = await firestore().collection('Users').doc(user.uid).get();
    //           console.log(documentSnapshot);
    
    //           if (documentSnapshot.exists) {
    //             const userData = documentSnapshot.data();
    //             console.log('userData===:', userData);
    //             setName(userData.fullname || '');
    //             setEmail(userData.email || '');
    //             setPhone(userData.phonenumber || '');
    //             setImageUri(userData.profileImage || null);
    //           } else {
    //             console.log('Document does not exist for UID:', user.uid);
    //           }
    //         } else {
    //           console.log('No authenticated user found');
    //         }
    //       } catch (error) {
    //         console.error('Error fetching profile:', error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    
    //     fetchProfile();
    //   }, []);


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
    
        fetchProfile();
      }, []);



    // useFocusEffect(
    //     useCallback(() => {
    //       const fetchProfile = async () => {
    //         setLoading(true);
    //         try {
    //           const user = auth().currentUser;
    //           if (user) {
    //             console.log('Current user UID:', user.uid);
    //             const documentSnapshot = await firestore().collection('Users').doc(user.uid).get();
    //             console.log(documentSnapshot);
      
    //             if (documentSnapshot.exists) {
    //               const userData = documentSnapshot.data();
    //               console.log('userData===xxx:', userData);
    //               setName(userData.fullname || '');
    //               console.log(userData.fullname )
    //               setEmail(userData.email || '');
    //               setPhone(userData.phonenumber || '');
    //               setImageUri(userData.profileImage || null);
    //             } else {
    //               console.log('Document does not exist for UID:', user.uid);
    //             }
    //           } else {
    //             console.log('No authenticated user found');
    //           }
    //         } catch (error) {
    //           console.error('Error fetching profile:', error);
    //         } finally {
    //           setLoading(false);
    //         }
    //       };
      
    //       fetchProfile();
    //     }, []) // Empty dependency array ensures this only runs on focus
    //   );
    
      const handleLogout = async () => {
        Alert.alert(
          'Confirm Logout',
          'Are you sure you want to log out?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Logout',
              onPress: async () => {
                try {
                  await auth().signOut();
                  // Clear AsyncStorage if needed
                  await AsyncStorage.removeItem('handleLogin');
                  // Navigate to LoginScreen
                  navigation.navigate('LoginScreen');
                } catch (error) {
                  Alert.alert('Error', error.message);
                }
              },
            },
          ],
          { cancelable: false }
        );
      };
    return (
        <View style={styles.container}>
            <View style={styles.flexrow}>
                <View style={styles.marrow}>
                    <Text style={styles.hellotex}>{String.Hello}  {fullname}</Text>
                    <Text style={styles.hellotex}>{String.wlcom}</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={styles.sinupbutton}>
                            <Text style={styles.textstyle}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                

                <TouchableOpacity  onPress={() => navigation.navigate('Viewprofile')} >
                <View style={styles.viewstyle}>
                    <Image source={{uri:imageUri}} style={styles.woman} />
                </View>

                </TouchableOpacity>
                
            </View>
            <Text style={styles.othertexrt}>{String.other}</Text>
            <View style={styles.viewstyle2}>
                <TouchableOpacity  onPress={() => navigation.navigate('Aboutus')} >
                    <View style={styles.flexrow2}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>{String.aboutus}</Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                    <View style={[styles.flexrow2,styles.flexrow3]}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>Address</Text> 
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AskedQuestions')}>
                    <View style={[styles.flexrow2,styles.flexrow3]}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>{String.faq}</Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => navigation.navigate('Aboutus')}>
                    <View style={[styles.flexrow2,styles.flexrow3]}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>{String.Privacy}</Text> 
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Aboutus')}>
                    <View style={[styles.flexrow2,styles.flexrow3]}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>{String.Terms}</Text> 
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Aboutus')}>
                    <View style={[styles.flexrow2,styles.flexrow3]}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>{String.How}</Text> 
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Helpcenter')}>
                    <View style={[styles.flexrow2,styles.flexrow3]}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>{String.helpcenter}</Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => navigation.navigate('InviteFriendScreen')}>
                    <View style={[styles.flexrow2,styles.flexrow3]}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>Invite friends</Text> 
                    </View>
                </TouchableOpacity>


                


                {/* <TouchableOpacity  onPress={() => navigation.navigate('LoginScreen')}>
                    <View style={[styles.flexrow2,styles.flexrow3]}>
                        <View style={styles.viewstyleadd}>
                            <Image source={icons.plus} style={styles.plus} />
                        </View>
                        <Text style={styles.textstyle2}>Logout</Text> 
                    </View>
                </TouchableOpacity> */}
                
            </View>
            
        </View>
    )
}

export default ProfileScreen

