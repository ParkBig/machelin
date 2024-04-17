import { useNetInfo } from '@react-native-community/netinfo';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { Colors } from 'const/global-styles';
import usersPostsLikedQuery from 'query/hooks/users/usersPostsLikedQuery';
import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import NoPostsLiked from './NoPostsLiked';
import Post from 'components/common/card/post/Post';
import Line from 'components/common/layout/Line';

export default function PostsLiked() {
  const netInfo = useNetInfo();
  const [refreshing, setRefreshing] = useState(false);
  const { postsLiked, postsLikedIsLoading, rePostsLiked, fetchNextPagePosts, isFetchingNextPage } =
    usersPostsLikedQuery();

  const onRefreshHandler = () => {
    setRefreshing(true);
    rePostsLiked();
    setRefreshing(false);
  };

  const onEndReachedHandler = () => {
    fetchNextPagePosts();
  };

  return (
    <View style={styles.wrap}>
      {netInfo.isConnected ? (
        postsLiked?.pages && postsLiked.pages.length !== 0 ? (
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
            onEndReached={onEndReachedHandler}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            data={postsLiked.pages}
            renderItem={({ item }) => <Post posts={item} />}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            ListFooterComponent={() => (
              <View style={styles.listFooterComponent}>
                <Text style={styles.text}>- 마슐랭 -</Text>
              </View>
            )}
          />
        ) : (
          <NoPostsLiked />
        )
      ) : (
        <View style={styles.netInfo}>
          <Text>인터넷 연결이 불안정합니다</Text>
        </View>
      )}
      {postsLikedIsLoading && <LoadingOverlay style={styles.defaultLoading} />}
      {isFetchingNextPage && <LoadingOverlay style={styles.moreDataLoading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  netInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  defaultLoading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  moreDataLoading: {
    width: '100%',
    height: '100%',
    paddingBottom: 20,
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  listFooterComponent: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: Colors.gray,
  },
});
