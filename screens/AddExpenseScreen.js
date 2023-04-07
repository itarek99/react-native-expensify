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
import Banner from '../components/Banner';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { expensesRef } from '../config/firebase';
import { categories } from '../constants';
import { colors } from '../theme';

const AddTripScreen = ({ route }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const tripData = route.params;

  const handleAddExpense = () => {
    if ((title, amount, category)) {
      setLoading(true);
      addDoc(expensesRef, { title, amount, category, tripID: tripData.id })
        .then(doc => {
          if (doc && doc.id) {
            navigation.goBack();
            setTitle('');
            setAmount('');
            setCategory('');
            setLoading(false);
          }
        })
        .catch(error => {
          Snackbar.show({
            text: error.message,
            backgroundColor: colors.error,
          });
        });
    } else {
      Snackbar.show({
        text: 'please fill all the fields',
        backgroundColor: colors.error,
      });
    }
  };

  return (
    <View className="justify-between h-full">
      <View>
        <Header title="Add Expense" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Banner
              bannerImage={require('../assets/images/expenseBanner.png')}
            />

            <View className="mx-4">
              <View className="mb-3">
                <Text className={`${colors.heading} text-lg font-bold mb-1.5`}>
                  Title
                </Text>
                <TextInput
                  value={title}
                  onChangeText={text => setTitle(text)}
                  className="px-4 py-4 bg-white rounded-xl"
                />
              </View>
              <View className="mb-3">
                <Text className={`${colors.heading} text-lg font-bold mb-1.5`}>
                  Amount
                </Text>
                <TextInput
                  value={amount}
                  onChangeText={text => setAmount(text)}
                  className="px-4 py-4 bg-white rounded-xl"
                />
              </View>

              <View className="mb-3">
                <Text className={`${colors.heading} text-lg font-bold mb-1.5`}>
                  Category
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {categories.map((item, index) => (
                    <Pressable
                      onPress={() => setCategory(item)}
                      key={index}
                      className={`${
                        item === category ? `bg-[${colors.button}]` : 'bg-white'
                      } px-4 py-2 rounded-full`}>
                      <Text
                        className={`${
                          item === category
                            ? 'text-white'
                            : `text-[${colors.heading}]`
                        } capitalize font-bold`}>
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
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
              onPress={handleAddExpense}
              className="bg-[#50c878] py-3 justify-center items-center">
              <Text className="text-white text-lg font-bold">Add Expense</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddTripScreen;
