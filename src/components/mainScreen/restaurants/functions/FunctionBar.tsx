import { StyleSheet, View } from 'react-native';
import RefreshNMyLocation from './RefreshNMyLocation';

export default function FunctionBar() {
  return (
    <View style={styles.wrap}>
      <View></View>
      <RefreshNMyLocation />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
    gap: 8,
  },
});
