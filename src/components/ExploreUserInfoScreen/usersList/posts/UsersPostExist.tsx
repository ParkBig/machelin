import { useRoute } from '@react-navigation/native';
import Post from 'components/common/post/Post';
import useExploreUsersPostsQuery from 'query/hooks/exploreUsers/useExploreUsersPostsQuery';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';

export default function UsersPostExist() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { posts, rePosts } = useExploreUsersPostsQuery(params.userId);

  return (
    <View style={styles.wrap}>
      {posts?.posts?.map(post => <Post key={post.id} posts={post} rePosts={rePosts} isDetailScreen={false} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 10,
    gap: 10,
  },
});
