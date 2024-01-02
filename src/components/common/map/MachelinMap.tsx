import { useEffect, useRef } from 'react';
import MapView, { MapPressEvent } from 'react-native-maps';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MapLocationState, focusedRestaurantState, mapLocationState, myLocationState } from 'store/locationState';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { StyleSheet, View } from 'react-native';

interface Props {
  onPress?: (event: MapPressEvent) => void;
  children: React.ReactNode;
}

export default function MachelinMap({ onPress, children }: Props) {
  const mapRef = useRef<MapView>(null);
  const setMyLocation = useSetRecoilState(myLocationState);
  const focusedRestaurant = useRecoilValue(focusedRestaurantState);
  const [mapLocation, setMapLocation] = useRecoilState(mapLocationState);

  const onRegionChangeHandler = (region: MapLocationState) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    setMapLocation({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  useEffect(() => {
    if (focusedRestaurant.isFocused && focusedRestaurant.latitude && focusedRestaurant.longitude) {
      mapRef.current?.animateToRegion(
        {
          latitude: focusedRestaurant.latitude - 0.0025,
          longitude: focusedRestaurant.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500
      );
    }
  }, [focusedRestaurant]);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== PermissionStatus.GRANTED) {
        return;
      }

      const getMyLocation = await getCurrentPositionAsync();
      const latitude = getMyLocation.coords.latitude;
      const longitude = getMyLocation.coords.longitude;

      setMyLocation({
        isGetLocation: true,
        latitude,
        longitude,
      });

      setMapLocation(prev => ({
        ...prev,
        latitude,
        longitude,
      }));
    };

    getLocation();
  }, [setMyLocation, setMapLocation]);

  return (
    <View style={styles.map}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={mapLocation}
        initialRegion={mapLocation}
        onPress={onPress}
        onRegionChangeComplete={onRegionChangeHandler}
      >
        {children}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
});
