import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

import HeaderComponets from '../../Componets/Header/HeaderComponets'
import { icons } from '../../Helper/icons'

const InviteFriendScreen = ({ navigation }) => {
  const [friendEmail, setFriendEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', mobile: '1234567890', invited: false, profilePic: require('../../../assets/images/users.png') },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', mobile: '9876543210', invited: true, profilePic: require('../../../assets/images/users.png') },
    { id: '3', name: 'Alice Johnson', email: 'alice@example.com', mobile: '9876123450', invited: false, profilePic: require('../../../assets/images/users.png') },
    { id: '4', name: 'John Doe', email: 'john@example.com', mobile: '1234567890', invited: false, profilePic: require('../../../assets/images/users.png') },
    { id: '5', name: 'Jane Smith', email: 'jane@example.com', mobile: '9876543210', invited: true, profilePic: require('../../../assets/images/users.png') },
    { id: '6', name: 'Alice Johnson', email: 'alice@example.com', mobile: '9876123450', invited: false, profilePic: require('../../../assets/images/users.png') },
    { id: '7', name: 'John Doe', email: 'john@example.com', mobile: '1234567890', invited: false, profilePic: require('../../../assets/images/users.png') },
    { id: '8', name: 'Jane Smith', email: 'jane@example.com', mobile: '9876543210', invited: true, profilePic: require('../../../assets/images/users.png') },
    { id: '9', name: 'Alice Johnson', email: 'alice@example.com', mobile: '9876123450', invited: false, profilePic: require('../../../assets/images/users.png') },
    // Add more users as needed
  ]);

  const handleInviteFriend = (userId) => {
    // Handle invite friend logic here
    // This could involve sending an invitation email or SMS
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, invited: true };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <HeaderComponets title={'Invite friends'} IconName={icons.back}/>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        placeholderTextColor={'white'}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Image source={item.profilePic} style={styles.profilePic} />
            <View style={styles.userInfo}>
              <Text style={{ fontFamily: 'Poppins-SemiBold',color:'black'}}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.mobile}</Text>
            </View>
            {!item.invited ? (
              <TouchableOpacity
                style={styles.inviteButton}
                onPress={() => handleInviteFriend(item.id)}>
                <Text style={styles.buttonText}>Invite</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.inviteButton}>
                <Text style={styles.buttonText}>Invited</Text>
              </TouchableOpacity>

            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 20,
    //paddingTop: 20,
     backgroundColor: '#21242b',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,marginLeft:12,marginRight:12,marginTop:12,color:'#FFFF'
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    padding:10,marginTop:10,borderRadius:10,backgroundColor:'#FFFF',marginLeft:12,marginRight:12
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    marginRight: 10,
  },
  inviteButton: {
    backgroundColor: '#c59619',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5, fontFamily: 'Poppins-SemiBold'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold', fontFamily: 'Poppins-SemiBold'
  }, arrow: { height: 30, width: 30 },
});

export default InviteFriendScreen;