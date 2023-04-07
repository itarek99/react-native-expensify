import { ImageBackground } from 'react-native';
import { Text } from 'react-native-svg';
const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash.jpg')}
      className="h-full w-full">
      <Text className="text-2xl text-white mt-12">Hello</Text>
    </ImageBackground>
  );
};
export default SplashScreen;
