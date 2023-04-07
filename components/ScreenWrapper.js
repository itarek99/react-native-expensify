import { Platform, StatusBar, StyleSheet, View } from 'react-native';

let wrapperPadding;
if (Platform.OS === 'ios') {
  wrapperPadding = StatusBar.currentHeight || 30;
} else {
  wrapperPadding = 0;
}

const ScreenWrapper = ({ children }) => {
  return <View style={styles.screenWrapperContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  screenWrapperContainer: { paddingTop: wrapperPadding, flex: 1 },
});

export default ScreenWrapper;
