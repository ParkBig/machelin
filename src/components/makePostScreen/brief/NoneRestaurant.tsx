import { StyleSheet, Text, View } from 'react-native';

export default function NoneRestaurant() {
  return (
    <View style={styles.wrap}>
      <Text>기억을 남길 곳을 골라볼까요?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
