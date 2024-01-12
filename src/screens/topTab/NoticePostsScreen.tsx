import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

export default function NoticePostsScreen() {
  return (
    <View style={styles.wrap}>
      <Text>NoticePostsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
});
