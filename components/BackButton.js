import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { colors } from '../theme';
const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} className="py-3 px-2">
      <ChevronLeftIcon size={28} color={colors.button} />
    </Pressable>
  );
};
export default BackButton;
