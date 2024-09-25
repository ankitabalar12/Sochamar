import {  Text, View,Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { styles } from './styles'
import { icons } from '../../Helper/icons'
import { String } from '../../Helper/string'
import LongButton from '../../Componets/LongButton/LongButton'
import ReactNativeModal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import CustomTextInput from '../../Componets/CustomTextInput/CustomTextInput'

const Updatefile = () => {
  const [modalVisible, setModalVisible] = useState()
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [zipcode, setZipcode] = useState('')
  const [errors, setErrors] = useState({});
  const [addresstitle, setAddresstitle] = useState('')

  console.log('selectedImage---', selectedImage)
  const navigation = useNavigation();
  const colorOpacityModal = 0.5;
  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  const handleBackPress = () => {
    navigation.goBack();
  };

  const openCamera = (imageIndex) => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
        saveToPhotos: true,
      },
      (response) => {
        if (!response.didCancel && !response.error) {
          if (imageIndex === 0) {
            setSelectedImage(response.uri);
          } else if (imageIndex === 1) {
            setSelectedImage1(response.uri);
          } else if (imageIndex === 2) {
            setSelectedImage2(response.uri);
          }
        }
      }
    );
  };
  
  const openLibrary = (imageIndex) => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1, // Allow only one image to be selected
      includeBase64: false,
    };
  
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        const uri = response.assets[0].uri;
        if (imageIndex === 0) {
          setSelectedImage(uri);
        } else if (imageIndex === 1) {
          setSelectedImage1(uri);
        } else if (imageIndex === 2) {
          setSelectedImage2(uri);
        }
      }
    });
  };
  const selectImage = (imageIndex) => {
    Alert.alert('Alert', 'Choose an option', [
      {
        text: 'Back',
        onPress: () => { },
      },
      {
        text: 'Camera',
        onPress: () => openCamera(imageIndex),
      },
      {
        text: 'Library',
        onPress: () => openLibrary(imageIndex),
      },
    ]);
  };
 
  return (
    <View style={styles.container}>
      <ScrollView>
      
     <View style={styles.mainview}>
      <View style={styles.flexrow2}>
        <TouchableOpacity  onPress={handleBackPress}>
        <Image source={icons.leftarrow} style={styles.leftarrow} />
      </TouchableOpacity>
      <Text style={styles.textupload}>{String.upload}</Text>
      </View>
      <CustomTextInput
        style={styles.textinputview}
        placeholder="Title"
        placeholderTextColor={'#fff'}
        value={addresstitle}
        onChangeText={(addresstitle) => setAddresstitle(addresstitle)} />
          {errors.addresstitle && <Text style={styles.erroetext}>{errors.addresstitle}</Text>}


     <View style={styles.flexrow3}>
      <Text style={styles.problemtext}>Problem/Issue </Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} >
      <View style={styles.viewstyle3} >
        <Image source={icons.question} style={styles.question} /> 
      </View>
      </TouchableOpacity>
     </View>
     
     <View style={styles.flexrow4}>
      <View style={styles.viewmain3}>

      

          <CustomTextInput
        style={styles.textinputview}
        mainviewstyle={styles.mainviewstyle}
        
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        placeholderTextColor={'#fff'}
        value={zipcode}
        onChangeText={(address) => setZipcode(address)} />
          {errors.address && <Text style={styles.erroetext}>{errors.address}</Text>}


        <Text style={styles.textstyle}>0/50 Characters</Text>
      </View>
      <TouchableOpacity style={styles.viewmain4}>
      <View>
      <Image source={icons.audio} style={styles.audio} />   
      </View>
      </TouchableOpacity>
     
     </View>
     <Text style={styles.pleasetext}>Please upload images or videos:</Text>

     <View style={styles.flexrow5}>
     
     {selectedImage ? (
      <Image source={{ uri: selectedImage }} style={styles.threeviewstyle} />
    ) : (
      <TouchableOpacity style={styles.threeviewstyle} onPress={() => selectImage(0)}>
        <Image source={icons.gallary2} style={styles.gallary2} />
      </TouchableOpacity>
    )}
      {selectedImage1 ? (
      <Image source={{ uri: selectedImage1 }} style={styles.threeviewstyle} />
    ) : (
      <TouchableOpacity style={styles.threeviewstyle} onPress={() => selectImage(1)}>
        <Image source={icons.gallary2} style={styles.gallary2} />
      </TouchableOpacity>
    )}
      {selectedImage2 ? (
      <Image source={{ uri: selectedImage2 }} style={styles.threeviewstyle} />
    ) : (
      <TouchableOpacity style={styles.threeviewstyle} onPress={() => selectImage(2)}>
        <Image source={icons.gallary2} style={styles.gallary2} />
      </TouchableOpacity>
    )}
     </View>
     <View style={styles.flexrow6}>
      <Text style={styles.textlebal}>Remarks</Text>
     </View>
     <View style={{marginBottom:20}}>
     <CustomTextInput
        style={styles.textinputview}
        mainviewstyle={styles.mainviewstyle}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        placeholderTextColor={'#fff'}
        value={zipcode}
        onChangeText={(address) => setZipcode(address)} />
          {errors.address && <Text style={styles.erroetext}>{errors.address}</Text>}
     </View>
     <LongButton
        title={String.next}
        onPress={() => navigation.navigate('ConfirmandPay')} 
        
      />
      




    {/* </View> */}
     </View>
     <ReactNativeModal
          isVisible={modalVisible}
          backdropColor='#000'
         backdropOpacity={colorOpacityModal}
          onBackdropPress={toggleModal}
          supportedOrientations={['portrait', 'landscape']}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['down']}
          onRequestClose={() => {
            setModalVisible(false)
          }}>   
    <View style={styles.mainvidemodal}>
      <View style={styles.flexrow9}>
        <View style={styles.dotview}>
        </View>
          <Text style={styles.textmodal}>{String.keep}</Text>
      </View>
      <View style={styles.flexrow10}>
        <View style={styles.dotview}>
        </View>
          <Text style={styles.textmodal}>{String.Be}</Text>
      </View>
      <Text style={styles.exmp}>{String.examples}</Text>
      <View style={styles.flexrow10}>
        <View style={styles.dotview}>
        </View>
          <Text style={styles.textmodal}>{String.Fix}</Text>
      </View>
      <View style={styles.flexrow10}>
        <View style={styles.dotview}>
        </View>
          <Text style={styles.textmodal}>{String.install}</Text>
      </View>
      <View style={styles.flexrow10}>
        <View style={styles.dotview}>
        </View>
          <Text style={styles.textmodal}>{String.help}</Text>
      </View>
      <TouchableOpacity style={styles.disnissview}>
      <Text style={styles.disniss}>{String.disniss}</Text>
      </TouchableOpacity>
     
    </View>
</ReactNativeModal>
<View style={styles.margin}></View>
</ScrollView>
    </View>
  )
}

export default Updatefile
