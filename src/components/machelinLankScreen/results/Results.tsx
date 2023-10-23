import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Results() {
  return (
    <ScrollView style={styles.wrap}>
      <View><Text>브리프 레스토랑 정보들어감</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: '100%',
    width: '100%',
    marginTop: 5,
  },
});
