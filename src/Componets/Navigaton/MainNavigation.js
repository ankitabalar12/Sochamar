import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../../Screen/Login/LoginScreen';
import ForgotPassword from '../../Screen/ForgotPassword/ForgotPassword';
import Register from '../../Screen/Register/Register';
import OnBoard from '../../Screen/OnBoard/OnBoard';
import Address from '../../Screen/Address/Address';
import Updatefile from '../../Screen/Updatefile/Updatefile';
import Help from '../../Screen/Help/Help';
import Notification from '../../Screen/Notification/NotificationScreen';
import NotificationScreen from '../../Screen/Notification/NotificationScreen';
import Aboutus from '../../Screen/AboutUs/Aboutus';
import Location from '../../Screen/Location/Location';
import ProfileScreen from '../../Screen/Profile/ProfileScreen';
import Helpcenter from '../../Screen/Helpcenter/Helpcenter';
import Home from '../../Screen/Home/Home';
import BottomTabNavigation from '../BottomTab/BottomTabNavigation';
import AskedQuestions from '../../Screen/AskedQuestions/AskedQuestions';
import ConfirmandPay from '../../Screen/ConfirmandPay/ConfirmandPay';
import CreatAddNewCard from '../../Screen/CreatAddNewCard/CreatAddNewCard';
import OrderComplete from '../../Screen/OrderComplete/OrderComplete';
import SwiperScreen from '../../Screen/Swiper/SwiperScreen';
import ChatList from '../../Screen/ChatList/ChatList';
import ChatMag from '../../Screen/ChatMsg/ChatMag';
import Viewprofile from '../../Screen/Viewprofile/Viewprofile';
import ListOfServicesScreen from '../../Screen/ListOfServicesScreen/ListOfServicesScreen';
import Offer from '../../Screen/Offer/Offer';
import InviteFriendScreen from '../../Screen/InviteFriendScreen/InviteFriendScreen';



// import { setTopLevelNavigation } from './NavigationHelper';

const stack = createStackNavigator()
global.url = 'https://www.demo603.amrithaa.com/homeservice/admin/public/api/'
// use to img
// https://www.demo603.amrithaa.com/homeservice/admin/public/







export default function MainNavigation() {
  return (
<NavigationContainer>
      <stack.Navigator initialRouteName='OnBoard'>
        <stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Register" component={Register} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="OnBoard" component={OnBoard} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Address" component={Address} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Updatefile" component={Updatefile} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Help" component={Help} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Aboutus" component={Aboutus} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Location" component={Location} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ConfirmandPay" component={ConfirmandPay} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Helpcenter" component={Helpcenter} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Home" component={BottomTabNavigation} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="AskedQuestions" component={AskedQuestions} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="CreatAddNewCard" component={CreatAddNewCard} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="OrderComplete" component={OrderComplete} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="SwiperScreen" component={SwiperScreen} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ChatList" component={ChatList} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ChatMag" component={ChatMag} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Viewprofile" component={Viewprofile} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ListOfServicesScreen" component={ListOfServicesScreen} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Offer" component={Offer} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="InviteFriendScreen" component={InviteFriendScreen} options={{ headerShown: false }}></stack.Screen>
      
        
        
      </stack.Navigator>
    </NavigationContainer>


  )
}
