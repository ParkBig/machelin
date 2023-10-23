import { StyleSheet, Text, View } from 'react-native';

export default function NoBookmark() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>감동의 마슐랭북마크를 만들어보아요!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
