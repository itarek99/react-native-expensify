import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { addDoc } from 'firebase/firestore';
import { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { tripsRef } from '../config/firebase';
import { colors } from '../theme';

const AddTripScreen = () => {
  const navigation = useNavigation();
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => state.user);
  const userID = user.uid;

  const handleAddTrip = () => {
    setLoading(true);
    if ((place, country)) {
      addDoc(tripsRef, { place, country, userID })
        .then(doc => {
          if (doc && doc.id) {
            setPlace('');
            setCountry('');
            setLoading(false);
            navigation.goBack();
          }
        })
        .catch(error => {
          Snackbar.show({
            text: error.message,
            backgroundColor: colors.error,
          });
          setLoading(false);
        });
    } else {
      Snackbar.show({
        text: 'place and country are required',
        backgroundColor: colors.error,
      });
      setLoading(false);
    }
  };

  return (
    <View className="justify-between h-full ">
      <View>
        <Header title="Add Trip" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Banner bannerImage={require('../assets/images/4.png')} />

            <View className="mx-4">
              <View className="mb-3">
                <Text className={`${colors.heading} text-lg font-bold mb-1.5`}>
                  Place
                </Text>
                <TextInput
                  value={place}
                  onChangeText={text => setPlace(text)}
                  className="px-4 py-4 bg-white rounded-xl"
                />
              </View>
              <View className="mb-16">
                <Text className={`${colors.heading} text-lg font-bold mb-1.5`}>
                  Country
                </Text>
                <TextInput
                  value={country}
                  onChangeText={text => setCountry(text)}
                  className="px-4 py-4 bg-white rounded-xl"
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
      <View className="mb-4 mx-4">
        <View className="rounded-xl overflow-hidden">
          {loading ? (
            <Loader />
          ) : (
            <Pressable
              android_ripple={{ color: '#3db364' }}
              onPress={handleAddTrip}
              className="bg-[#50c878] py-3 justify-center items-center">
              <Text className="text-white text-lg font-bold">Add Trip</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddTripScreen;
