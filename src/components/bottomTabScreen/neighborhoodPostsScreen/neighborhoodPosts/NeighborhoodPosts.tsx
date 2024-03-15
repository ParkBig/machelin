import Post from 'components/common/card/post/Post';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { Colors } from 'const/global-styles';
import useNeighborhoodPostsQuery from 'query/hooks/posts/useNeighborhoodPostsQuery';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';
import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import NoNeighborhoodPosts from './NoNeighborhoodPosts';
import { useNetInfo } from '@react-native-community/netinfo';
import Line from 'components/common/layout/Line';

export default function NeighborhoodPosts() {
  const netInfo = useNetInfo();
  const [refreshing, setRefreshing] = useState(false);
  const { reMySubLocality, mySubLocalityIsLoading } = useUsersSubLocalityQuery();
  const {
    neighborhoodPosts,
    neighborhoodPostsIsLoading,
    isReNeighborhoodPosts,
    reNeighborhoodPosts,
    fetchNextPageNeighborhoodPosts,
    isFetchingNextPage,
  } = useNeighborhoodPostsQuery();

  const onRefreshHandler = () => {
    setRefreshing(true);
    reMySubLocality();
    reNeighborhoodPosts();
    setRefreshing(false);
  };

  const onEndReachedHandler = () => {
    fetchNextPageNeighborhoodPosts();
  };

  return (
    <View style={styles.wrap}>
      {netInfo.isConnected ? (
        neighborhoodPosts?.pages.length !== 0 ? (
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
            onEndReached={onEndReachedHandler}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => String(index)}
            data={neighborhoodPosts?.pages}
            renderItem={({ item }) => <Post posts={item} />}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            ListFooterComponent={() => (
              <View style={styles.listFooterComponent}>
                <Text style={styles.text}>- 마슐랭 -</Text>
              </View>
            )}
          />
        ) : (
          <NoNeighborhoodPosts />
        )
      ) : (
        <View style={styles.netInfo}>
          <Text>인터넷 연결이 불안정합니다</Text>
        </View>
      )}
      {(mySubLocalityIsLoading || neighborhoodPostsIsLoading || (!isFetchingNextPage && isReNeighborhoodPosts)) && <LoadingOverlay style={styles.defaultLoading} />}
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
