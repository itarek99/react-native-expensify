import { View, Text, FlatList } from 'react-native';
import { colors } from '../theme';

import SeparatorComponent from './SeparatorComponent';
import TripCard from './TripCard';
import EmptyList from './EmptyList';

const items = [
  { id: 1, place: 'Faridpur', country: 'Bangladesh' },
  { id: 2, place: 'Dhaka', country: 'Bangladesh' },
  { id: 3, place: 'New York', country: 'America' },
  { id: 4, place: 'Sajek', country: 'Bangladesh' },
  { id: 5, place: 'New York', country: 'America' },
  { id: 6, place: 'Sajek', country: 'Bangladesh' },
];

const MostExpensiveSection = () => {
  return (
    <View className="px-4 space-y-4">
      <View className="flex-row justify-between items-center">
        <Text className={`${colors.heading} font-bold text-xl`}>
          Most Expensive Trips
        </Text>
      </View>
      <View>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={SeparatorComponent}
          ListEmptyComponent={EmptyList}
          showsVerticalScrollIndicator={false}
          data={items}
          renderItem={({ item }) => <TripCard item={item} />}
        />
      </View>
    </View>
  );
};
export default MostExpensiveSection;
