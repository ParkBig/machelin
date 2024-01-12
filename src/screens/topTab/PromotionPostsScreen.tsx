import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

export default function PromotionPostsScreen() {
  return (
    <View style={styles.wrap}>
      <Text>준비중입니다..!</Text>
      <Text>문의하기) parkbig.dev@gmail.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
