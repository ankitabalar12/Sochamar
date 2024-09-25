import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import HeaderComponets from '../../Componets/Header/HeaderComponets'
import { icons } from '../../Helper/icons'
import { firestore } from '../firebaseHelper';
import { ActivityIndicator } from 'react-native';


const ListOfServicesScreen = ({ route, navigation }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { categoryId } = route.params;
  console.log('categoryId <>', categoryId)
  // useEffect(() => {
  //   fetchServices
  // },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const servicesData = await getServicesByCategory(categoryId);
        setServices(servicesData);
        setFilteredServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);


  const getServicesByCategory = async (categoryId) => {
    try {
      console.log(`categoryId: ${categoryId}`);
      const categoryIdString = String(categoryId);
      console.log('categoryIdString:', categoryIdString);

      const snapshot = await firestore()
        .collection('service')
        .where('category', '==', categoryId)
        .get();

      // Transform Firestore data
      const services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Services from Firestore:', services);
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  };


  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       console.log(`categoryId: ${categoryId}`);

  //       const snapshot = await firestore()
  //         .collection('service')
  //         .where('categoryId', '==', categoryId)
  //         .get();

  //       console.log('Snapshot:', snapshot);
  //       console.log('Snapshot empty:', snapshot.empty);

  //       if (snapshot.empty) {
  //         console.log('No matching documents.');
  //         setServices([]);
  //         setFilteredServices([]);
  //         return;
  //       }

  //       const servicesList = snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       console.log('Fetched services:', servicesList);

  //       setServices(servicesList);
  //       setFilteredServices(servicesList);
  //     } catch (error) {
  //       console.error('Error fetching services:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchServices();
  // }, [categoryId]);

  // const fetchServices = async (categoryId) => {
  //   try {
  //     console.log(`Fetching services for categoryId: ${categoryId}`);
  //     const snapshot = await firestore()
  //       .collection('service')
  //       .where('categoryId', '==', categoryId)
  //       .get();

  //     if (snapshot.empty) {
  //       console.log('No matching services found.');

  //     }
  //     const servicesList = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log('Fetched services:', servicesList);
  //     return servicesList;
  //   } catch (error) {
  //     console.error('Error fetching services:', error);
  //     throw error;
  //   }
  // };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = services.filter((service) =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filteredData);
    } else {
      setFilteredServices(services);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponets title={'Choose a Service'} IconName={icons.back} />
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor={'#c59619'}
          placeholder="Search services..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {loading && <ActivityIndicator size="large" color="#ffff" />}
      {filteredServices.length === 0 ? (
        <Text style={{ color: '#fff', alignSelf: "center", marginTop: '15%' }}>No service found</Text>
      ) : (
        filteredServices.map(item => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreatAddNewCard', {
                servicealldata: item.image,
                price: item.price,
                servicename: item.name,
                id: item.id,
              });
            }}
            style={styles.serviceItem}
          >
            <Image source={{ uri: item.image }} style={styles.serviceIcon} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceName}>{item.price}</Text>
              <Text style={styles.serviceDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>

        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242b',
  },
  header: {
    marginBottom: 20, paddingHorizontal: 15, marginTop: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, color: '#FFFF'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff'
  },
  list: {
    flex: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '90%', alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

    backgroundColor: '#fff', // ensure a white background for shadow to be visible
    // Shadow styles for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow styles for Android
    elevation: 5,
    // Margin to avoid overlapping shadows
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10, padding: 5
  },
  serviceIcon: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    color: '#888',
  },
});

export default ListOfServicesScreen;
