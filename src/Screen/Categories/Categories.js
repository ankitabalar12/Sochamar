import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import HeaderComponets from '../../Componets/Header/HeaderComponets'
import { String } from '../../Helper/string'
import { icons } from '../../Helper/icons'
import { firestore } from '../firebaseHelper'
const Categories = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        console.log('Fetched Categories:', categoriesData);
        setCategories(categoriesData);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategories = async () => {
    try {
      const snapshot = await firestore().collection('categories').get();
      const categories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Categories from Firestore:', categories);
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  const getCategoryBackgroundColor = (index) => {
    return colors[index % colors.length]; 
  };
  const colors = [
    '#e0f7fa', 
    '#e8f5e9', 
    '#dbfdeb', 
    '#ccffff', 
    '#ccccff', 
    '#ffffcc', 
    '#cce6ff', 
    '#d9e6f2', 
    '#d9f2e6', 
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        
         

        <View style={styles.flewrwo}>
         {categories.length === 0 ? (
              <Text style={{ color: '#fff', }}>No categories found</Text>
            ) : (
              categories.map((category, index) => (
                <View>
                  <TouchableOpacity   onPress={() => {
                      navigation.navigate('ListOfServicesScreen', { categoryId: category.id });
                    }} style={[styles.rowview, { backgroundColor: getCategoryBackgroundColor(index) }]}>
                    <Image source={{ uri: category.image }} style={styles.police} />
                  </TouchableOpacity>
                  <Text style={styles.viewtext}>{category.name}</Text>
               </View>
              ))
            )}
            </View>


      
       
        <View style={styles.marginview} />
      </ScrollView>
    </View>
  )
}

export default Categories

