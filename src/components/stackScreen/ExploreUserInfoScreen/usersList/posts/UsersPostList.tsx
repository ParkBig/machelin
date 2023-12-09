import { useRoute } from '@react-navigation/native';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import NoPost from 'components/bottomTabScreen/myScreen/myList/myPosts/NoPost';
import useExploreUsersPostsQuery from 'query/hooks/exploreUsers/useExploreUsersPostsQuery';
import Post from 'components/common/post/Post';
import { FlatList } from 'react-native-gesture-handler';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function UsersPostList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { posts, postsIsLoading, rePosts } = useExploreUsersPostsQuery(params.userId);
  const postsExist = posts?.posts && posts.posts.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {postsIsLoading ? (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    paddingTop: 10,
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
