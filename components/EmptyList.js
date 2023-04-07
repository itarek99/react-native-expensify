import { View, Text, Image } from 'react-native';
const EmptyList = ({ message = 'No Data Found' }) => {
  return (
    <View className="w-full">
      <View className="justify-center items-center my-5">
        <Image
          className="w-36 h-36"
          source={require('../assets/images/empty.png')}
        />
        <Text className="font-bold text-gray-400">{message}</Text>
      </View>
    </View>
  );
};
export default EmptyList;
