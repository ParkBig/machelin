import { StyleSheet, View } from 'react-native';
import NoPost from './NoPost';
import { Colors } from 'const/global-styles';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import Post from 'components/common/card/post/Post';
import { FlatList } from 'react-native-gesture-handler';
import AvailableAfterLogin from 'components/common/modal/AvailableAfterLogin';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import Line from 'components/common/layout/Line';

export default function MyPostList() {
  const { myInfo } = useMyInfoQuery();
  const { posts, postsIsLoading, rePosts, isFetchingNextPage } = useUsersPostsQuery();
  const postsExist = posts?.pages && posts.pages.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {myInfo?.authUser ? (
        postsExist ? (
          <FlatList
            scrollEnabled={false}
            style={styles.posts}
            showsVerticalScrollIndicator={false}
            data={posts?.pages}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => <Post posts={item} />}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            ListFooterComponent={() => <Line style={styles.line} />}
          />
        ) : (
          <NoPost />
        )
      ) : (
        <AvailableAfterLogin />
      )}

      {postsIsLoading && <LoadingOverlay style={styles.loadingTop} />}
      {isFetchingNextPage && <LoadingOverlay style={styles.loadingBottom} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: Colors.mainGreen2,
  },
  posts: {
    width: '100%',
  },
  line: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  loadingTop: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },
  loadingBottom: {
    width: '100%',
    height: '100%',
    paddingBottom: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
  },
});
