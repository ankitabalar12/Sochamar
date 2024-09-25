import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from '../../Helper/icons';



import Home from '../../Screen/Home/Home';
import Bookings from '../../Screen/Bookings/Bookings';
import Categories from '../../Screen/Categories/Categories';
import ProfileScreen from '../../Screen/Profile/ProfileScreen';



const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {

  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#c59619',
        tabBarLabelStyle: {
          marginBottom: 10,
          fontSize: 10,
          fontWeight: '800'
        },
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          alignItems: 'center',
          position: 'absolute',
          borderColor: '#1a1915',
          borderWidth: 0.5,
          height: 70,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          // borderBottomEndRadius: 10,
          // borderBottomStartRadius: 10,
          // marginBottom: 5,
          // margin: 5,
          elevation: 5, // Add elevation for shadow
            },

      }}>

      <Tab.Screen
        name="Home"

        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (

            <Image
              source={icons.homepage}
              style={{
                tintColor: focused ? '#c59619' : '#fff',
                height: 25,
                width: 25,
                alignSelf: 'center',
              }}
            />

          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Bookings"
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ focused }) => (

            <Image
              source={icons.calendar}
              style={{
                tintColor: focused ? '#c59619' : '#fff',
                height: 20,
                width: 20,
                // marginBottom: '1%',
                alignSelf: 'center',
              }}
            />

          ),
        }}
        component={Bookings} />

      <Tab.Screen
        name="Categories"
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ focused }) => (

            <Image
              source={icons.category}
              style={{
                tintColor: focused ? '#c59619' : '#fff',
                height: 20,
                width: 20,
                // marginBottom: '1%',
                alignSelf: 'center',
              }}
            />

          ),
        }}
        component={Categories}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (

            <Image
              source={icons.userr}
              style={{
                tintColor: focused ? '#c59619' : '#fff',
                height: 20,
                width: 20,
                // marginBottom: '1%',
                alignSelf: 'center',
              }}
            />

          ),
        }}
        component={ProfileScreen}

      />

    </Tab.Navigator>

  );
}

export default BottomTabNavigation