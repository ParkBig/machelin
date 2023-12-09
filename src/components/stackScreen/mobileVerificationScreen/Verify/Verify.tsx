import { StyleSheet, View } from 'react-native';
import MobileInput from './MobileInput';

export default function Verify() {
  return (
    <View style={styles.wrap}>
      <MobileInput />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 5.5,
    width: '100%',
  },
});
