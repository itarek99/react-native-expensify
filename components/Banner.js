import { Image, View } from 'react-native';
const Banner = ({ bannerImage }) => {
  return (
    <View className="flex-row justify-center items-center rounded-xl mx-4 mb-4 bg-green-200">
      <Image source={bannerImage} className="h-64" resizeMode="contain" />
    </View>
  );
};
export default Banner;
