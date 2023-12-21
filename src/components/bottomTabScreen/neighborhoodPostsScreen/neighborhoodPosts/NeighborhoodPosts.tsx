import Post from 'components/common/card/post/Post';
import Line from 'components/common/layout/Line';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { Colors } from 'const/global-styles';
import useNeighborhoodPostsQuery from 'query/hooks/posts/useNeighborhoodPostsQuery';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';
import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import NoNeighborhoodPosts from './NoNeighborhoodPosts';

export default function NeighborhoodPosts() {
  const [refreshing, setRefreshing] = useState(false);
  const { mySubLocality, reMySubLocality, mySubLocalityIsLoading } = useUsersSubLocalityQuery();
  const {
    neighborhoodPosts,
    neighborhoodPostsIsLoading,
    reNeighborhoodPosts,
    fetchNextPageRestaurants,
    isFetchingNextPage,
  } = useNeighborhoodPostsQuery(mySubLocality?.subLocality);

  const onRefreshHandler = () => {
    setRefreshing(true);
    reMySubLocality();
    reNeighborhoodPosts();
    setRefreshing(false);
  };

  const onEndReachedHandler = () => {
    fetchNextPageRestaurants();
  };
  
  return (
    <View style={styles.wrap}>
      {neighborhoodPosts?.pages.length !== 0 ? (
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
          onEndReached={onEndReachedHandler}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          data={neighborhoodPosts?.pages}
          renderItem={({ item }) => <Post posts={item} rePosts={reNeighborhoodPosts} isDetailScreen={false} />}
        />
      ) : (
        <NoNeighborhoodPosts />
      )}
      {(mySubLocalityIsLoading || neighborhoodPostsIsLoading) && <LoadingOverlay style={styles.defaultLoading} />}
      {isFetchingNextPage && <LoadingOverlay style={styles.moreDataLoading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.lightGrayOpacity1,
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
});
