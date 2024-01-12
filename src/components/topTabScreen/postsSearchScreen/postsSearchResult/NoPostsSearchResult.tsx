import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NoPostsSearchResult() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="reader-outline" size={100} color={Colors.gray} />
      <Text style={styles.text}>조건에 해당하는 게시글이 없어요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    opacity: 0.7,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
