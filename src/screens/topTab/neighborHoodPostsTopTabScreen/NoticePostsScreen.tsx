import NoticePosts from 'components/topTabScreen/NoticePostsScreen/NoticePosts';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';

export default function NoticePostsScreen() {
  return (
    <View style={styles.wrap}>
      <NoticePosts />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
});
