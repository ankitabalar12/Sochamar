import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB0R-kpL3zt8o4sdd7k65CXTnsf4zZ8u1Q",
  authDomain: "amiable-might-399506.firebaseapp.com",
  databaseURL: "https://amiable-might-399506-default-rtdb.firebaseio.com",
  projectId: "amiable-might-399506",
  storageBucket: "amiable-might-399506.appspot.com",
  messagingSenderId: "285993772515",
  appId: "1:285993772515:web:569b3d80236fea75f9ecd6",
  measurementId: "G-6568GE16FH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firestore, auth, storage };