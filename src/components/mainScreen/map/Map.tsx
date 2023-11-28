import { useRef } from 'react';
import { StyleSheet, LayoutAnimation } from 'react-native';
import { useRecoilState } from 'recoil';
import MapView from 'react-native-maps';
import { focusedRestaurantState, mapLocationState } from 'store/locationState';
import { mainScreenTogglesState } from 'store/toggleState';
import { MapLocationState } from 'types/store/locationType';
import MyLocationPing from './myLocationPing/MyLocationPing';
import RestaurantPings from './restaurantPings/RestaurantPings';

export default function Map() {
  const mapRef = useRef<MapView>(null);
  const [mapLocation, setMapLocation] = useRecoilState(mapLocationState);
  const [focusedRestaurant, setFocusedRestaurant] = useRecoilState(focusedRestaurantState);
  const [mainScreenToggles, setMainScreenToggles] = useRecoilState(mainScreenTogglesState);
  
  const mapPressHandler = () => {
    if (mainScreenToggles.toggleRestaurantList) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMainScreenToggles(prev => ({ ...prev, toggleRestaurantList: false }));
      setMapLocation(prev => ({
        ...prev,
        latitude: prev.latitude + 0.0045,
      }));
    }
    if (mainScreenToggles.toggleRestaurantSearch || mainScreenToggles.toggleOptions) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMainScreenToggles(prev => ({ ...prev, toggleRestaurantSearch: false, toggleOptions: false }));
    }
    if (focusedRestaurant.isFocused) {
      setFocusedRestaurant({ isFocused: false, id: null, latitude: null, longitude: null });
    }
  };

  const onRegionChangeHandler = (region: MapLocationState) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    setMapLocation({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      region={mapLocation}
      initialRegion={mapLocation}
      onPress={mapPressHandler}
      onRegionChangeComplete={onRegionChangeHandler}
    >
      <MyLocationPing />
      <RestaurantPings />
    </MapView>
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
