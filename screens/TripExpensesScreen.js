import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/solid';
import Banner from '../components/Banner';
import EmptyList from '../components/EmptyList';
import ExpenseCard from '../components/ExpenseCard';
import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import { expensesRef } from '../config/firebase';
import { colors } from '../theme';

const TripExpensesScreen = ({ route }) => {
  const tripDate = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [expenseData, setExpenseData] = useState();

  const fetchExpenses = async () => {
    const q = query(expensesRef, where('tripID', '==', tripDate.id));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setExpenseData(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  return (
    <ScreenWrapper>
      <View>
        <Header title="Trip Expenses" />
        <View className="relative">
          <Banner bannerImage={require('../assets/images/7.png')} />
          <View className="absolute left-8 bottom-8 flex-row items-center gap-1">
            <MapPinIcon size={18} color={colors.button} />
            <Text className={`${colors.heading} text-base capitalize`}>
              {tripDate.place}, {tripDate.country}
            </Text>
          </View>
        </View>

        <View className="px-4 space-y-4 mb-3">
          <View className="flex-row justify-between items-center">
            <Text className={`${colors.heading} font-bold text-xl`}>
              Recent Trips
            </Text>
            <Pressable
              onPress={() => navigation.navigate('add-expense', tripDate)}
              className="py-2 px-4 bg-white border border-gray-200 rounded-full">
              <Text className={`${colors.heading} `}>Add Expense</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View className="flex-1 mx-4">
        <FlatList
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyList message="no expense added yet!" />}
          showsVerticalScrollIndicator={false}
          data={expenseData}
          renderItem={({ item }) => <ExpenseCard item={item} />}
        />
      </View>
    </ScreenWrapper>
  );
};
export default TripExpensesScreen;
