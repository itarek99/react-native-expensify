import { View, Text } from 'react-native';
import { colors } from '../theme';
const ExpenseCard = ({ item }) => {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 mb-3 bg-white rounded-xl">
      <View>
        <Text className={`${colors.heading} font-medium text-base`}>
          {item.title}
        </Text>
        <Text className={`${colors.heading} text-sm text capitalize`}>
          {item.category}
        </Text>
      </View>
      <View>
        <Text>{item.amount}৳</Text>
      </View>
    </View>
  );
};
export default ExpenseCard;
