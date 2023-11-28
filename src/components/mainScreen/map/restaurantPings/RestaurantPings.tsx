import useNearbyRestaurantsQuery from 'query/hooks/restaurants/useNearbyRestaurantsQuery';
import { Marker } from 'react-native-maps';

export default function RestaurantPings() {
  const { restaurants } = useNearbyRestaurantsQuery();

  return (
    <>
      {restaurants?.restaurants.map(prop => (
        <Marker
          key={prop.place_id}
          coordinate={{ latitude: prop.geometry.location.lat, longitude: prop.geometry.location.lng }}
          title={prop.name}
        />
      ))}
    </>
  );
}
