import PostsSearchInput from 'components/topTabScreen/postsSearchScreen/postsSearchInput/ PostsSearchInput';
import PostsSearchResult from 'components/topTabScreen/postsSearchScreen/postsSearchResult/PostsSearchResult';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';

export default function PostsSearchScreen() {
  return (
    <View style={styles.wrap}>
      <PostsSearchInput />
      <PostsSearchResult />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
});
