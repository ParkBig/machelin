import useNearbyRestaurantsSearchQuery from 'query/hooks/restaurants/useNearbyRestaurantsSearchQuery';
import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useRecoilValue } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';
import { GooglePlace } from 'types/types';

interface Props {
  restaurantInfo: GooglePlace;
}

const MemoizedMarker = memo(({ restaurantInfo }: Props) => {
  const focusedRestaurant = useRecoilValue(focusedRestaurantState);

  return (
    <Marker
      coordinate={{ latitude: restaurantInfo.geometry.location.lat, longitude: restaurantInfo.geometry.location.lng }}
      title={restaurantInfo.name}
    >
      <View style={styles.wrap}>
        <Image
          source={
            focusedRestaurant.id === restaurantInfo.place_id
              ? require('assets/png/restaurant-red-ping.png')
              : require('assets/png/restaurant-ping.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 40,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default function RestaurantPings() {
  const { restaurants } = useNearbyRestaurantsSearchQuery();

  return (
    <>
      {restaurants?.pages.map((restaurant, index) => (
        <MemoizedMarker key={`${restaurant.place_id}_${index}`} restaurantInfo={restaurant} />
      ))}
    </>
  );
}
