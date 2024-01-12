import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

export default function SearchPostsScreen() {
  return (
    <View style={styles.wrap}>
      <Text>searchPosts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
});
