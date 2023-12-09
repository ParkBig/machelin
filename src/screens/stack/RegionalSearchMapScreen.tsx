import RegionalSearchMap from 'components/stackScreen/regionalSearcMapScreen/RegionalSearchMap';
import { StyleSheet, View } from 'react-native';

export default function RegionalSearchMapScreen() {
  return (
    <View style={styles.wrap}>
      <RegionalSearchMap />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});