import { ActivityIndicator, View } from 'react-native';
import { colors } from '../theme';
const Loader = () => {
  return (
    <View className="flex-row justify-center py-3">
      <ActivityIndicator size="large" color={colors.button} />
    </View>
  );
};
export default Loader;
