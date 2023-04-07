import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { auth } from '../config/firebase';
import { setUserLoading } from '../redux/features/userSlice';
import { colors } from '../theme';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if ((email, password)) {
      dispatch(setUserLoading(true));
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          AsyncStorage.setItem('email', email);
          AsyncStorage.setItem('password', password);
          navigation.navigate('home');
          setEmail('');
          setPassword('');
          dispatch(setUserLoading(false));
        })
        .catch(error => {
          Snackbar.show({
            text: error.message,
            backgroundColor: '#E74646',
          });
          dispatch(setUserLoading(false));
        });
    } else {
      Snackbar.show({
        text: 'email and password required',
        backgroundColor: '#E74646',
      });
    }
  };

  return (
    <View className="justify-between flex-1">
      <View>
        <Header title="Sign Up" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Banner bannerImage={require('../assets/images/login.png')} />

            <View className="mx-4 mb-16">
              <View className="mb-3">
                <Text className={`${colors.heading} text-lg font-bold mb-1.5`}>
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  className="px-4 py-4 bg-white rounded-xl"
                />
              </View>
              <View className="mb-3">
                <Text className={`${colors.heading} text-lg font-bold mb-1.5`}>
                  Password
                </Text>
                <TextInput
                  secureTextEntry
                  value={password}
                  onChangeText={text => setPassword(text)}
                  className="px-4 py-4 bg-white rounded-xl"
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
      <View className="mb-4 mx-4">
        <View className="rounded-xl overflow-hidden">
          {userLoading ? (
            <Loader />
          ) : (
            <Pressable
              android_ripple={{ color: '#3db364' }}
              onPress={handleSubmit}
              className="bg-[#50c878] py-3 justify-center items-center">
              <Text className="text-white text-lg font-bold">Sign Up</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
