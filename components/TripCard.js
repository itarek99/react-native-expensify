import { View, Text, Pressable, Image } from 'react-native';
import randomImage from '../assets/images/randomImage';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
const TripCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('trip-expenses', { ...item })}
      className="bg-white p-2 rounded-2xl mb-5 shadow-sm">
      <View>
        <Image source={randomImage()} className="h-32 w-32" />
        <View className="py-1 px-2">
          <Text className={`${colors.heading} font-bold capitalize`}>
            {item.place}
          </Text>
          <Text className={`${colors.heading} text-xs capitalize`}>
            {item.country}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
export default TripCard;
