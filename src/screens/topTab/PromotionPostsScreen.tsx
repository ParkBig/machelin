import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

export default function PromotionPostsScreen() {
  return (
    <View style={styles.wrap}>
      <Text>PromotionPostsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
});
