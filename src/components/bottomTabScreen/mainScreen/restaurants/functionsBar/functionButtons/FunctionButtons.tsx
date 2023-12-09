import { StyleSheet, View } from 'react-native';
import Radius from './Radius';
import ToMyLocation from './ToMyLocation';

export default function FunctionButtons() {
  return (
    <View style={styles.wrap}>
      <Radius />
      <ToMyLocation />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingBottom: 5,
    gap: 10,
  },
});
