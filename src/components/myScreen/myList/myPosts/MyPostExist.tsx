import Post from 'components/common/post/Post';
import { StyleSheet, View } from 'react-native';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function MyPostExist() {
  const { myInfo } = useMyInfoQuery();
  const { posts } = useUsersPostsQuery(myInfo?.authUser?.id);

  return (
    <View style={styles.wrap}>
      {posts?.posts?.map(post => <Post key={post.id} posts={post} likes={posts.likes} dislikes={posts.dislikes} />)}
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
