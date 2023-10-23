import { StyleSheet, Text, View } from 'react-native';

export default function MyImage() {
  return (
    <View style={styles.wrap}>
      <Text>image</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingTop: 25,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
