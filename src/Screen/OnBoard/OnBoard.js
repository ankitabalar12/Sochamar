import React, { useEffect,useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { icons } from '../../Helper/icons';
import AsyncStorage from '@react-native-community/async-storage';
import { auth, firestore } from '../firebaseHelper';
const OnBoard = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5)
// useEffect(() => {
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const result = await AsyncStorage.getItem('handleLogin');
//       console.log('result----', result);
//       const screenData = JSON.parse(result);
//       console.log('screenData----', screenData);

//       if (screenData) {
//         try {
//           const user = await auth().signInWithEmailAndPassword(screenData.email, screenData.password);
//           if (user) {
//             navigation.navigate('Home');
//           } else {
//             navigation.navigate('SwiperScreen');
//           }
//         } catch (loginError) {
//           console.error('Error during login:', loginError);
//           navigation.navigate('SwiperScreen');
//         }
//       } else {
//         navigation.navigate('SwiperScreen');
//       }
//     } catch (error) {
//       console.error('Error fetching login data:', error);
//       Alert.alert('Error', 'An unexpected error occurred.');
//       navigation.navigate('SwiperScreen');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);

// useEffect(() => {
//   async function fetchData() {
//     setLoading(true);
//     const result = await AsyncStorage.getItem('logindata');
//     console.log('result----', result);
//     const screenData = JSON.parse(result);
//     console.log('screenData----', screenData);
//     if (screenData) {
//        const user = await auth().signInWithEmailAndPassword(screenData.email, screenData.password);
//        navigation.navigate('HomeScreen');
//     } else {
//        navigation.navigate('LoginScreen');
//     }
//     setLoading(false);
//   }
//   const timer = setTimeout(() => {
//     if (timeLeft > 0) {
//         setTimeLeft(timeLeft - 1);
//     } else {
//         fetchData(); // After timer finishes, fetch data
//     }
// }, 1000);
// return () => clearTimeout(timer);
    
// }, [navigation, timeLeft]);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // Get the current authenticated user
//       const user = auth().currentUser;
      
//       if (user) {
//         console.log('Current user UID:', user.uid);
        
//         // Fetch user document from Firestore
//         const documentSnapshot = await firestore().collection('Users').doc(user.uid).get();
        
//         if (documentSnapshot.exists) {
//           const userData = documentSnapshot.data();
//           console.log('User data:', userData);
         
//           await AsyncStorage.setItem('handleLogin', JSON.stringify(userData));
          
        
//           const result = await AsyncStorage.getItem('handleLogin');
//           console.log('result',result)
//           const screenData = JSON.parse(result);
//           console.log('screenData <>',screenData)
          
//           if (screenData && screenData.email && screenData.password) {
           
//             try {
//               await auth().signInWithEmailAndPassword(screenData.email, screenData.password);
//               navigation.navigate('Home');
//             } catch (signInError) {
//               console.error('Sign-in error:', signInError);
//               navigation.navigate('SwiperScreen');
//             }
//           } else {
//             navigation.navigate('SwiperScreen');
//           }
//         } else {
//           console.log('No document found for UID:', user.uid);
//           navigation.navigate('SwiperScreen');
//         }
//       } else {
//         console.log('No authenticated user found');
//         navigation.navigate('SwiperScreen');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       navigation.navigate('SwiperScreen');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();

//   // Optional cleanup function
//   return () => {
//     // Cleanup code if needed
//   };
// }, [navigation]);

useEffect(() => {
  const fetchData = async () => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setLoading(false);
      if (user) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('SwiperScreen');
      }
    });

    // Clean up the subscription on component unmount
    return unsubscribe;
  };

  const timer = setTimeout(() => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    } else {
      fetchData(); // After timer finishes, fetch data
    }
  }, 1000);

  // Clear timeout to avoid memory leaks
  return () => clearTimeout(timer);

}, [navigation, timeLeft]);
  return (
    <View style={styles.container}>
   
      <Image source={icons.homeserviselogo} style={styles.logo}/>
 <Text style={styles.text}>Só chamar</Text>
  </View>
   
  );
}

export const styles = StyleSheet.create({
    container:{
      backgroundColor: '#21242b',
        flex:1,
        //  justifyContent:'center'
    },
    logo:{
        height:150, width:150, alignSelf:"center",
          marginTop:"50%", marginRight:'5%'
    },
    text:{
        fontSize:25, 
        fontFamily: 'Poppins-SemiBold',
        textAlign:'center',
        color:"#c59619"
    }
})

export default OnBoard;