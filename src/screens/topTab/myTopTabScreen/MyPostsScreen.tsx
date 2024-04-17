import Post from 'components/common/card/post/Post';
import Line from 'components/common/layout/Line';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import MakePost from 'components/topTabScreen/myPostsScreen/MakePost';
import NoPost from 'components/topTabScreen/myPostsScreen/NoPost';
import { Colors } from 'const/global-styles';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

export default function MyPostsScreen() {
  const { posts, postsIsLoading, rePosts, isFetchingNextPage, isRePosts } = useUsersPostsQuery();
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshHandler = () => {
    setRefreshing(true);
    rePosts();
    setRefreshing(false);
  };

  const postsExist = posts?.pages && posts.pages.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {postsExist ? (
        <>
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
            showsVerticalScrollIndicator={false}
            data={posts?.pages}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Post posts={item} />}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            ListFooterComponent={() => <Line style={styles.listFooterComponent} />}
          />
          <MakePost />
        </>
      ) : (
        <NoPost />
      )}
      {(isFetchingNextPage || postsIsLoading || isRePosts) && <LoadingOverlay style={styles.loadingOverlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.mainWhite1,
  },
  line: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  listFooterComponent: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
