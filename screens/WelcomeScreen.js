import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <View className="flex-1 justify-between">
        <View className="flex-row justify-center mt-10">
          <Image
            source={require('../assets/images/welcome.gif')}
            className="w-full h-96"
            resizeMode="contain"
          />
        </View>
        <View className="mb-20">
          <Text
            className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>
            Expensify
          </Text>
          <View className="mx-12">
            <Pressable
              onPress={() => navigation.navigate('sign-in')}
              className={`bg-[${colors.button}] rounded-xl py-2.5 mb-4`}>
              <Text className="text-center text-white text-lg font-bold">
                Sign In
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('sign-up')}
              className="bg-white rounded-xl py-2.5">
              <Text
                className={`text-center text-[${colors.heading}] text-lg font-bold`}>
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};
export default WelcomeScreen;
