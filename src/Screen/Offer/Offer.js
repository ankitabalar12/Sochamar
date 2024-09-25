import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import HeaderComponets from '../../Components/Header/HeaderComponets'; // Fixed typo: 'Componets' to 'Components'
import { icons } from '../../Helper/icons';
import { firestore } from '../firebaseHelper';
import HeaderComponets from '../../Componets/Header/HeaderComponets';

const Offer = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerData = await getBanner();
        console.log('Fetched Banners:', bannerData);
        setBanners(bannerData);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBanner = async () => {
    try {
      const snapshot = await firestore().collection('banner').get();
      const banners = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return banners;
    } catch (error) {
      console.error('Error fetching banner:', error);
      throw error; // Ensure the error is thrown so it can be caught in fetchData
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceItem}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>; // Add a loading indicator
  }

  return (
    <View style={styles.container}>
      <HeaderComponets title={'Offers'} IconName={icons.back} />
      {/* <FlatList
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      /> */}

      {banners.length === 0 ? (
        <Text style={styles.noOffersText}>No offers found</Text>
      ) : (
        <FlatList
          data={banners}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242b',
  },
  loadingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 18,
  },
  list: {
    flex: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#21242b',
  },
  serviceDescription: {
    color: '#888',
  },
});

export default Offer;
