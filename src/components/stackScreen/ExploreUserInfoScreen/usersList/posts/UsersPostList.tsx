import { useRoute } from '@react-navigation/native';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import NoPost from 'components/bottomTabScreen/myScreen/myList/myPosts/NoPost';
import useExploreUsersPostsQuery from 'query/hooks/exploreUsers/useExploreUsersPostsQuery';
import Post from 'components/common/card/post/Post';
import { FlatList } from 'react-native-gesture-handler';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import Line from 'components/common/layout/Line';

export default function UsersPostList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { posts, postsIsLoading, rePosts, isFetchingNextPage } = useExploreUsersPostsQuery(params.userId);
  const postsExist = posts?.pages && posts.pages.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {postsExist ? (
        <FlatList
          scrollEnabled={false}
          style={styles.posts}
          showsVerticalScrollIndicator={false}
          data={posts?.pages}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => <Post posts={item} rePosts={rePosts} isDetailScreen={false} />}
          ListHeaderComponent={() => <Line style={styles.line} />}
          ItemSeparatorComponent={() => <Line style={styles.line} />}
          ListFooterComponent={() => <Line style={styles.line} />}
        />
      ) : (
        <NoPost />
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
