import useNearbyRestaurantsSearchQuery from 'query/hooks/restaurants/useNearbyRestaurantsSearchQuery';
import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { GooglePlace } from 'types/types';

interface Props {
  restaurantInfo: GooglePlace;
}

const MemoizedMarker = memo(({ restaurantInfo }: Props) => {
  return (
    <Marker
      tracksViewChanges={true}
      coordinate={{ latitude: restaurantInfo.geometry.location.lat, longitude: restaurantInfo.geometry.location.lng }}
      title={restaurantInfo.name}
    >
      <View style={styles.wrap}>
        <Image source={require('assets/png/restaurant-ping.png')} style={styles.image} resizeMode="cover" />
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
