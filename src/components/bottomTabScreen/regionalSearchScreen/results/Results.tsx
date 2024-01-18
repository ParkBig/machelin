import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';import { Colors } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import NoResults from './NoResults';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefRestaurantInfo from 'components/common/card/BriefRestaurantInfo';
import { useState } from 'react';
import useRegionalRestaurantSearchQuery from 'query/hooks/restaurants/useRegionalRestaurantSearchQuery';
import { useNetInfo } from '@react-native-community/netinfo';

export default function Results() {
  const netInfo = useNetInfo();
  const { navigate } = useNavigation<UseNavigation<'RegionalSearchScreen'>>();
  const [refreshing, setRefreshing] = useState(false);
  const { restaurants, fetchNextPageRestaurants, isFetchingNextPage, reRestaurants, restaurantsIsLoading } =
    useRegionalRestaurantSearchQuery();

  const restaurantsIsExist = restaurants?.pages && restaurants.pages.length !== 0 ? true : false;

  const onRefreshHandler = () => {
    setRefreshing(true);
    reRestaurants();
    setRefreshing(false);
  };

  const onEndReachedHandler = () => {
    fetchNextPageRestaurants();
  };

  return (
    <View style={styles.wrap}>
      {netInfo.isConnected ? (
        restaurantsIsExist ? (
          <>
            <FlatList
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
              onEndReached={onEndReachedHandler}
              data={restaurants?.pages}
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item }) => {
                const navigateHandler = () => {
                  navigate('RestaurantDetailScreen', {
                    restaurantId: item.place_id,
                    restaurantName: item.name,
                  });
                };

                return <BriefRestaurantInfo restaurant={item} isList={true} fnc={navigateHandler} />;
              }}
              ListFooterComponent={() => (
                <View style={styles.listFooterComponent}>
                  <Text style={styles.text}>- 마슐랭 -</Text>
                </View>
              )}
            />
          </>
        ) : (
          <NoResults />
        )
      ) : (
        <View style={styles.netInfo}>
          <Text>인터넷 연결이 불안정합니다</Text>
        </View>
      )}
      {restaurantsIsLoading && <LoadingOverlay style={styles.defaultLoading} />}
      {isFetchingNextPage && <LoadingOverlay style={styles.moreDataLoading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative',
  },
  flatList: {
    flex: 1,
  },
  button: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: Colors.mainGreen2,
  },
  ionicons: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  defaultLoading: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    justifyContent: 'flex-start',
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
  netInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
