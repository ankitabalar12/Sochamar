import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import HeaderComponets from '../../Componets/Header/HeaderComponets'
import { String } from '../../Helper/string'
import { icons } from '../../Helper/icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import LongButton from '../../Componets/LongButton/LongButton'
import ReactNativeModal from 'react-native-modal'
import { CheckBox } from 'react-native-elements'

const ConfirmandPay = ({navigation}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState()
  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const colorOpacityModal = 0.9;
  const price1 = 39.00;
  const price2 = 2.50;
  const totalPrice = price1 + price2;
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShowPicker1(Platform.OS === 'ios');
    setDate1(currentDate);
  };

  const showDatepicker1 = () => {
    setShowPicker1(true);
  };

  const formattedDate = date1 ? new Date(date1).toLocaleDateString('en-US', {
    weekday: 'short', // Abbreviated weekday name (e.g., 'Wed')
    day: '2-digit',   // Day of the month, 2 digits with leading zeros (e.g., '27')
    month: 'short',   // Abbreviated month name (e.g., 'Nov')
    year: 'numeric',  // Full year (e.g., '2023')
  }) : null;
  console.log(formattedDate);
  const onTimeChange = (event, selectedValue) => {
    const currentTime = selectedValue || new Date();
    const newSelectedTime = new Date(currentTime.getTime() + 5 * 60 * 60 * 1000); // Add 5 hours
    setSelectedTime(newSelectedTime);
    setShowTimePicker(false);
  };

  const showTimePickerHandler = () => {
    setShowTimePicker(true);
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // Handle midnight
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      <HeaderComponets
        title={String.ConfirmandPay}
        IconName={icons.back}
      />
      <ScrollView>
        <View style={styles.mainiew}>
          <View style={styles.flexrow}>
            <View style={styles.confimview}>
              <Image source={icons.heirstyle} style={styles.serviceman} />
            </View>
            <View>
              <Text numberOfLines={2} style={styles.Jeanettestyle}>{String.Jeanette}</Text>
              <View style={styles.daterflex}>
                <TouchableOpacity style={styles.flewcodate} onPress={showDatepicker}>
                  <Image source={icons.date} style={styles.date} />
                </TouchableOpacity>
                {date ? (
                  <Text style={styles.selecteddate}>{`${date.toLocaleDateString()}`}</Text>
                ) : (
                  <Text style={styles.selecteddate}>MM-DD-YY</Text>
                )}

                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
              <View style={styles.timerow}>
                <TouchableOpacity style={styles.flewcodate} onPress={showTimePickerHandler}>
                  <Image source={icons.clock} style={styles.date} />
                </TouchableOpacity>
                {selectedTime ? (
                  <Text style={styles.selecteddate}>© {formatAMPM(selectedTime)}</Text>
                ) : (
                  <Text style={styles.selecteddate}>HH:MM</Text>
                )}
                {showTimePicker && (
                  <DateTimePicker
                    value={selectedTime || new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onTimeChange}
                  />
                )}
              </View>
            </View>
          </View>
          <Text style={styles.youevent}>{String.youevent}</Text>
          <View style={styles.serviceflex}>
            <Image source={icons.wrench} style={styles.wrench} />
            <Text style={styles.Services}>{String.Services}</Text>
            <Text style={styles.Standart}>{String.Standart}</Text>
          </View>
          <View style={[styles.serviceflex, styles.serviceflex2]}>
            <Image source={icons.engineer} style={styles.wrench} />
            <Text style={styles.Services}>{String.Worker}</Text>
            <Text style={styles.Standart}>{String.Person}</Text>
          </View>
          <View style={[styles.serviceflex, styles.serviceflex2]}>
            <TouchableOpacity onPress={showDatepicker1}>
              <Image source={icons.date} style={styles.wrench} />
            </TouchableOpacity>

            <Text style={styles.Services}>{String.Dates}</Text>
            {/* <Text style={styles.Standart}>{String.Dates}</Text> */}
            {date1 ? (
              <Text style={styles.Standart}>{formattedDate}</Text>
            ) : (
              <Text style={styles.Standart}>MM-DD-YY</Text>
            )}
            {showPicker1 && (
              <DateTimePicker
                value={date1}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange1}
              />
            )}
          </View>
          <Text style={styles.youevent}>{String.PriceDetails}</Text>
          <View style={styles.priceflex}>
            <Text style={styles.Price}>{String.Price}</Text>
            <Text style={[styles.Price, styles.Price2]}>{`$${price1.toFixed(2)}`}</Text>
          </View>
          <View style={[styles.priceflex, styles.priceflex2]}>
            <Text style={styles.Appsfee}>{String.Appsfee}</Text>
            <Text style={[styles.Price, styles.Price2]}>{`$${price2.toFixed(2)}`}</Text>
          </View>
          <View style={[styles.priceflex, styles.priceflex2]}>
            <Text style={styles.Totalprice}>{String.Totalprice}</Text>
            <Text style={[styles.Price, styles.Price2]}>{formattedTotalPrice}</Text>
          </View>

        </View>
        <Text style={styles.PaymentMethod}>{String.PaymentMethod}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.Paymenivewbutton}>
            <View style={styles.pyameflex}>
              <View style={styles.tworow}>
                <View style={styles.roundview}></View>
                <View style={styles.roundview2}></View>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.texttext}>{String.MasterCard}</Text>
                <Text style={styles.texttext}>{String.sd}</Text>
              </View>
              <TouchableOpacity style={styles.rightposi} onPress={() => setModalVisible(true)}>
                <Image source={icons.rightarrow} style={styles.rightarrow} />
              </TouchableOpacity>

            </View>
          </View>
          <LongButton
            title={String.payNow}
            confirmpayscreenbutton={styles.confirmpayscreenbutton}
            onPress={() => setModalVisible(true)}  
          />
        </TouchableOpacity>
        <View style={styles.bittommarginsad} />
      </ScrollView>
      <ReactNativeModal
        isVisible={modalVisible}
        backdropColor='rgba(0, 0, 0, 0.5)'
        backdropOpacity={colorOpacityModal}
        onBackdropPress={toggleModal}
        supportedOrientations={['portrait', 'landscape']}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['right']}
        onRequestClose={() => setModalVisible(false)}

        style={{ margin: 0, bottom: 0 }}
      >
        <View style={styles.mainviewmodal}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View style={styles.logview}></View>
          </TouchableOpacity>
          <Text style={styles.PaymentMethod2}>{String.PaymentMethod}</Text>
          <View style={styles.paymethodview}>
            <View style={styles.flewrowpay}>
              <View style={styles.flexrowpay}>
                <Image source={icons.paypal} style={styles.paypal} />
              </View>
              <View>
                <Text style={styles.papyall}>{String.papyall}</Text>
                <Text style={styles.sascom}>{String.sascom}</Text>
              </View>
              <CheckBox
                checked={isSelected}
                onPress={() => setSelection(!isSelected)}
                containerStyle={styles.checkboxContainer}
                checkedColor="#c59619"// Background color of the checkbox
                checkedIcon={<View style={styles.checkboxview}>
                  <Image source={icons.check} style={styles.checkmark} />
                  </View>}
              />
            </View>

          </View>

          <View style={[styles.paymethodview, styles.paymethodview2]}>
            <View style={styles.flewrowpay}>
              <View style={styles.tworow}>
                <View style={styles.roundview}></View>
                <View style={styles.roundview2}></View>
              </View>
              <View>
                <Text style={[styles.papyall, styles.papyall2]}>{String.MasterCard}</Text>
                <Text style={[styles.sascom, styles.sascom3]}>{String.sd}</Text>
              </View>
              <CheckBox
                checked={isSelected2}
                onPress={() => setSelection2(!isSelected2)}
                containerStyle={styles.checkboxContainer}
                checkedColor="#c59619"// Background color of the checkbox
                checkedIcon={<View style={styles.checkboxview}>
                  <Image source={icons.check} style={styles.checkmark} />
                  </View>}
              />
            </View>

          </View>
       
          <TouchableOpacity onPress={() => {navigation.navigate('CreatAddNewCard');
          setModalVisible(false)
        }} style={[styles.paymethodview, styles.paymethodview2, styles.paymethodview3]}>
          <View style={styles.flexaddrow}>
            <TouchableOpacity>
            <View style={styles.addvide}>
            <Image source={icons.plus} style={styles.plus} />
            </View>
            </TouchableOpacity>
            <Text style={styles.papyall}>{String.addpayme}</Text>
            </View>
         
          </TouchableOpacity>
         
          <LongButton
            title={String.ConfirmPayment}
            confirmpayscreenbutton={styles.confirmpayscreenbutton}
            onPress={() => {navigation.navigate('OrderComplete');
              setModalVisible(false)
            }}

          />
        </View>
      </ReactNativeModal>
    </View>
  )
}

export default ConfirmandPay

