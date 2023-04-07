import { FlatList, Pressable, Text, View } from 'react-native';
import { colors, styles } from '../theme';

import EmptyList from './EmptyList';
import SeparatorComponent from './SeparatorComponent';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tripsRef } from '../config/firebase';
import TripCard from './TripCard';

const RecentTrips = () => {
  const [tripsData, setTripsData] = useState([]);
  const navigation = useNavigation();
  const { user } = useSelector(state => state.user);
  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userID', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setTripsData(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  return (
    <View className="px-4 space-y-4">
      <View className="flex-row justify-between items-center">
        <Text className={`${colors.heading} font-bold text-xl`}>
          Recent Trips
        </Text>
        <Pressable
          onPress={() => navigation.navigate('add-trip')}
          className="py-2 px-4 bg-white border border-gray-200 rounded-full">
          <Text className={`${colors.heading} `}>Add Trip</Text>
        </Pressable>
      </View>
      <View>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={SeparatorComponent}
          ListEmptyComponent={<EmptyList message="no trips recoded yet!" />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={tripsData}
          renderItem={({ item }) => <TripCard item={item} />}
        />
      </View>
    </View>
  );
};
export default RecentTrips;
