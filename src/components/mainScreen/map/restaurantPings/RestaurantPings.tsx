import useNearbyRestaurantsQuery from 'query/hooks/restaurants/useNearbyRestaurantsQuery';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useRecoilState } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';

export default function RestaurantPings() {
  const { restaurants } = useNearbyRestaurantsQuery();
  const [focusedRestaurant, setFocusedRestaurant] = useRecoilState(focusedRestaurantState);

  return (
    <>
      {restaurants?.pages.map((prop, index) => (
        <Marker
          key={`${prop.place_id}_${index}`}
          coordinate={{ latitude: prop.geometry.location.lat, longitude: prop.geometry.location.lng }}
          title={prop.name}
        >
          <View style={styles.wrap}>
            <Image
              source={focusedRestaurant.id === prop.place_id ? require('assets/png/restaurant-red-ping.png') : require('assets/png/restaurant-ping.png')}
              style={styles.image}
              resizeMode='cover'
            />
          </View>
        </Marker>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 40
  },
  image: {
    width: 40,
    height: 40,
  }
})
