import useNearbyRestaurantsSearchQuery from 'query/hooks/restaurants/useNearbyRestaurantsSearchQuery';
import { memo, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { GooglePlace } from 'types/types';

interface Props {
  restaurantInfo: GooglePlace;
  isTrack:boolean;
}

const MemoizedMarker = memo(({ restaurantInfo, isTrack }: Props) => {
  return (
    <Marker
      tracksViewChanges={isTrack}
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
  const [isTrack, setIsTrack] = useState(false);

  useEffect(() => {
    setIsTrack(true);

    const trackOut = setTimeout(() => {
      setIsTrack(false);
    }, 500);

    return () => clearInterval(trackOut);
  }, [restaurants]);

  return (
    <>
      {restaurants?.pages.map((restaurant, index) => (
        <MemoizedMarker key={`${restaurant.place_id}_${index}`} restaurantInfo={restaurant} isTrack={isTrack} />
      ))}
    </>
  );
}
