import { StyleSheet, Text, View } from 'react-native';
import MyId from './MyId';
import MyContentsInfo from './MyContentsInfo';

export default function MyInfos() {
  return (
    <View style={styles.wrap}>
      <MyId/>
      <MyContentsInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
