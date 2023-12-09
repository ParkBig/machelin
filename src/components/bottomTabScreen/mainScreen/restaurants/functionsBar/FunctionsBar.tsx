import { StyleSheet, View } from 'react-native';
import InstanceInfo from './InstanceInfo';
import FunctionButtons from './functionButtons/FunctionButtons';

export default function FunctionsBar() {
  return (
    <View style={styles.wrap}>
      <InstanceInfo />
      <FunctionButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 10,
  },
});
