import { StyleSheet, View } from 'react-native';
import NoPost from './NoPost';
import { Colors } from 'const/global-styles';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import Post from 'components/common/post/Post';
import { FlatList } from 'react-native-gesture-handler';
import AvailableAfterLogin from 'components/common/modal/AvailableAfterLogin';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function MyPostList() {
  const { myInfo } = useMyInfoQuery();
  const { posts, postsIsLoading, rePosts } = useUsersPostsQuery(myInfo?.authUser?.id);
  const postsExist = posts?.posts && posts.posts.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {myInfo?.authUser ? (
        postsIsLoading ? (
          <LoadingOverlay style={styles.loadingOverlay} />
        ) : postsExist ? (
          <FlatList
            scrollEnabled={false}
            style={styles.posts}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 20 }}
            data={posts?.posts}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <Post key={item.id} posts={item} rePosts={rePosts} isDetailScreen={false} />}
          />
        ) : (
          <NoPost />
        )
      ) : (
        <AvailableAfterLogin />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: Colors.mainGreen1,
  },
  posts: {
    width: '100%',
    paddingVertical: 20,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
