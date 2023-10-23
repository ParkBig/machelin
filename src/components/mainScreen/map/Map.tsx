import { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, LayoutAnimation } from 'react-native';
import { getCurrentPositionAsync } from 'expo-location';
import { useRecoilState } from 'recoil';
import MapView, { Callout, Marker } from 'react-native-maps';
import { focusedRestaurantState, mapLocationState, myLocationState } from 'store/locationState';
import { useForegroundPermissions } from 'expo-location';
import { mockRestaurantList } from 'data/mockRestaurantList';
import { verifyLocationPermissions } from 'util/verifyLocationPermissions';
import { toggleHeaderOptionState, toggleRestaurantsListState, toggleSearchState } from 'store/toggleState';
import { MapLocationState } from 'types/store/locationType';

export default function Map() {
  const mockData = mockRestaurantList;
  const mapRef = useRef<MapView>(null);
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [mapLocation, setMapLocation] = useRecoilState(mapLocationState);
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const [toggleSearch, setToggleSearch] = useRecoilState(toggleSearchState);
  const [toggleHeaderOption, setToggleHeaderOption] = useRecoilState(toggleHeaderOptionState);
  const [toggleRestaurantList, setToggleRestaurantList] = useRecoilState(toggleRestaurantsListState);
  const [focusedRestaurant, setFocusedRestaurant] = useRecoilState(focusedRestaurantState);

  const mapPressHandler = () => {
    if (toggleRestaurantList) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setToggleRestaurantList(false);
      setMapLocation(prev => ({
        ...prev,
        latitude: prev.latitude + 0.0045,
      }));
    }
    if (toggleSearch || toggleHeaderOption) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setToggleSearch(false);
      setToggleHeaderOption(false);
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

  useEffect(() => {
    const getLocation = async () => {
      const hasLocationPermission = await verifyLocationPermissions(locationPermissionInformation, requestPermission);
      if (!hasLocationPermission) return;

      const getMyLocation = await getCurrentPositionAsync();

      setMyLocation({
        isGetLocation: true,
        latitude: getMyLocation.coords.latitude,
        longitude: getMyLocation.coords.longitude,
      });
      setMapLocation(prev => ({
        ...prev,
        latitude: getMyLocation.coords.latitude,
        longitude: getMyLocation.coords.longitude,
      }));
    };

    getLocation();
  }, [setMyLocation, setMapLocation]);

  if (!myLocation.isGetLocation) {
    return (
      <View style={styles.map}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      region={mapLocation}
      initialRegion={mapLocation}
      onPress={mapPressHandler}
      onRegionChangeComplete={onRegionChangeHandler}
    >
      {myLocation.isGetLocation && (
        <Marker coordinate={{ latitude: myLocation.latitude, longitude: myLocation.longitude }} pinColor="default">
          <Callout tooltip={true}>
            <View style={{ backgroundColor: 'tomato' }}>
              <Text>내위치</Text>
            </View>
          </Callout>
        </Marker>
      )}
      {mockData.map(prop => (
        <Marker
          key={prop.place_id}
          coordinate={{ latitude: prop.geometry.location.lat, longitude: prop.geometry.location.lng }}
          title={prop.name}
        />
      ))}
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
