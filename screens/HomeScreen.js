import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Banner from '../components/Banner';
import MostExpensiveSection from '../components/MostExpensiveSection';
import RecentTrips from '../components/RecentTrips';
import ScreenWrapper from '../components/ScreenWrapper';
import { auth } from '../config/firebase';
import { colors } from '../theme';

const HomeScreen = () => {
  const removeUserCredential = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    } catch (error) {
      console.log('something wrong');
    }
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        removeUserCredential();
      })
      .catch(error => {
        Snackbar.show({
          text: 'problem with sing out',
          backgroundColor: '#E74646',
        });
      });
  };

  return (
    <ScreenWrapper className="flex-1 justify-center items-center">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl`}>
          Expensify
        </Text>
        <Pressable
          onPress={handleLogOut}
          className="py-2 px-4 bg-white border border-gray-200 rounded-full">
          <Text className={`${colors.heading} `}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner bannerImage={require('../assets/images/banner.png')} />
        <RecentTrips />
        <MostExpensiveSection />
      </ScrollView>
    </ScreenWrapper>
  );
};
export default HomeScreen;
