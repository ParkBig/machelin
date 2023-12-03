import { StyleSheet, View } from 'react-native';
import { ScreenHeight } from 'const/dimenstions';
import { Colors, Shadow } from 'const/global-styles';
import useNearbyRestaurantsQuery from 'query/hooks/restaurants/useNearbyRestaurantsQuery';
import RestaurantInfo from './RestaurantInfo';
import { FlatList } from 'react-native-gesture-handler';
import Line from 'components/common/Line';
import LoadingOverlay from 'components/common/LoadingOverlay';

export default function RestaurantList() {
  const { restaurants, fetchNextPageRestaurants, isFetchingNextPage } = useNearbyRestaurantsQuery();

  const onEndReachedHandler = () => {
    fetchNextPageRestaurants();
  };

  return (
    <View style={styles.wrap}>
      <FlatList
        data={restaurants?.pages}
        onEndReached={onEndReachedHandler}
        ItemSeparatorComponent={() => <Line style={styles.line} />}
        renderItem={({ item, index }) => <RestaurantInfo key={`${item.place_id}_${index}`} restaurant={item} />}
      />
      {isFetchingNextPage && <LoadingOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    maxHeight: (ScreenHeight * 53) / 100,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.mainWhite1,
    ...Shadow,
    overflow: 'hidden',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.superLightGray,
  },
});
