import { StyleSheet, View } from 'react-native';
import Title from './title/Title';
import List from './list/List';

export default function Social() {
  return (
    <View style={styles.wrap}>
      <Title />
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingBottom: 30,
  },
});
