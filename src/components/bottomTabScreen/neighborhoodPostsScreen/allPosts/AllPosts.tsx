import { useNetInfo } from '@react-native-community/netinfo';
import Post from 'components/common/card/post/Post';
import Line from 'components/common/layout/Line';
import { Colors } from 'const/global-styles';
import useAllPostsQuery from 'query/hooks/posts/useAllPostsQuery';
import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import NoAllPosts from './NoAllPosts';

export default function AllPosts() {
  const netInfo = useNetInfo();
  const [refreshing, setRefreshing] = useState(false);

  const { allPosts, allPostsIsLoading, isFetchingNextPage, isReAllPosts, reAllPosts, fetchNextPageNeighborhoodPosts } =
    useAllPostsQuery();

  const onRefreshHandler = () => {
    setRefreshing(true);
    reAllPosts();
    setRefreshing(false);
  };

  const onEndReachedHandler = () => {
    fetchNextPageNeighborhoodPosts();
  };

  return (
    <View style={styles.wrap}>
      {netInfo.isConnected ? (
        allPosts?.pages.length !== 0 ? (
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
            onEndReached={onEndReachedHandler}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => String(index)}
            data={allPosts?.pages}
            renderItem={({ item }) => <Post posts={item} />}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            ListFooterComponent={() => (
              <View style={styles.listFooterComponent}>
                <Text style={styles.text}>- 마슐랭 -</Text>
              </View>
            )}
          />
        ) : (
          <NoAllPosts />
        )
      ) : (
        <View style={styles.netInfo}>
          <Text>인터넷 연결이 불안정합니다</Text>
        </View>
      )}
      {(allPostsIsLoading || (!isFetchingNextPage && isReAllPosts)) && <LoadingOverlay style={styles.defaultLoading} />}
      {isFetchingNextPage && <LoadingOverlay style={styles.moreDataLoading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
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
  line: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  netInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
