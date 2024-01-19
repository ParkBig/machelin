import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { UseRouter } from 'types/screenType';

export default function RestaurantDetailPing() {
  const {
    params: { restaurantName, restaurantLat, restaurantLng },
  } = useRoute<UseRouter<'RestaurantDetailMapScreen'>>();
  const [isTrack, setIsTrack] = useState(false);

  useEffect(() => {
    setIsTrack(true);

    const trackOut = setTimeout(() => {
      setIsTrack(false);
    }, 500);

    return () => clearInterval(trackOut);
  }, [restaurantName, restaurantLat, restaurantLng]);

  return (
    <Marker
      tracksViewChanges={isTrack}
      coordinate={{ latitude: restaurantLat, longitude: restaurantLng }}
      title={restaurantName}
    >
      <View style={styles.wrap}>
        <Image source={require('assets/png/restaurant-ping.png')} style={styles.image} resizeMode="cover" />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
