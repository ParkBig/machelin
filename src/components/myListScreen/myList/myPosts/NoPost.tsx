import { StyleSheet, Text, View } from "react-native";

export default function NoPost() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>게시글이 없군요! 작성해볼까요?</Text>
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
