import NotLoggedIn from 'components/topTabScreen/postsLikedScreen/NotLoggedIn';
import PostsLiked from 'components/topTabScreen/postsLikedScreen/PostsLiked';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, View } from 'react-native';

export default function PostsLikedScreen() {
  const { myInfo } = useMyInfoQuery();

  return <View style={styles.wrap}>{myInfo?.authUser ? <PostsLiked /> : <NotLoggedIn />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
});
