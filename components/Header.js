import { Text, View } from 'react-native';
import { colors } from '../theme';
import BackButton from './BackButton';
const Header = ({ title }) => {
  return (
    <View className="relative mb-4">
      <Text className={`${colors.heading} text-xl font-bold text-center mt-3`}>
        {title}
      </Text>
      <View className="absolute">
        <BackButton />
      </View>
    </View>
  );
};
export default Header;
