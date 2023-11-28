import { StyleSheet, View } from 'react-native';
import { ScreenHeight } from 'const/dimenstions';
import { Shadow } from 'const/global-styles';
import useNearbyRestaurantsQuery from 'query/hooks/restaurants/useNearbyRestaurantsQuery';
import RestaurantInfo from './RestaurantInfo';
import { FlatList } from 'react-native-gesture-handler';

export default function RestaurantList() {
  const { restaurants } = useNearbyRestaurantsQuery();

  return (
    <View style={styles.wrap}>
      <FlatList
        data={restaurants?.restaurants}
        keyExtractor={item => item.place_id}
        renderItem={({ item }) => <RestaurantInfo key={item.place_id} restaurant={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    maxHeight: (ScreenHeight * 53) / 100,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Shadow,
    overflow: 'hidden',
  },
});
