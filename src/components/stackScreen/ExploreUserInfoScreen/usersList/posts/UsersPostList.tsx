import { useRoute } from '@react-navigation/native';
import { Colors } from 'const/global-styles';
import { FlatList, StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screenType';
import useExploreUsersPostsQuery from 'query/hooks/exploreUsers/useExploreUsersPostsQuery';
import Post from 'components/common/card/post/Post';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import Line from 'components/common/layout/Line';
import NoPost from './NoPost';

export default function UsersPostList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { posts, postsIsLoading, isFetchingNextPage } = useExploreUsersPostsQuery(params.userId);
  const postsExist = posts?.pages && posts.pages.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {postsExist ? (
        <FlatList
          scrollEnabled={false}
          style={styles.posts}
          showsVerticalScrollIndicator={false}
          data={posts?.pages}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Post posts={item} />}
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
    height: 10,
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
