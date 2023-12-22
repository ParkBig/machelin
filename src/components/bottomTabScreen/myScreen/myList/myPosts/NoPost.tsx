import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';

export default function NoPost() {
  return (
    <View style={styles.wrap}>
      <Ionicons name='reader-outline' size={100} color={Colors.gray} />
      <Text style={styles.text}>게시글/리뷰를 남겨볼까요?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray
  },
});
