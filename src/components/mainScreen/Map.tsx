import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getCurrentPositionAsync } from 'expo-location';
import { useRecoilState } from 'recoil';
import MapView, { Callout, MapPressEvent, Marker } from 'react-native-maps';
import { myLocationState } from 'store/locationState';
import { useForegroundPermissions } from 'expo-location';
import { verifyLocationPermissions } from 'util/verifyLocationPermissions';

export default function Map() {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const myRegion = {
    latitude: myLocation.isGetLocation ? myLocation.latitude : 37.4979,
    longitude: myLocation.isGetLocation ? myLocation.longitude : 127.0276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
    };

    getLocation();
  }, [setMyLocation]);

  if (!myLocation.isGetLocation) {
    return (
      <View style={styles.map}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MapView style={styles.map} initialRegion={myRegion}>
      {myLocation.isGetLocation && (
        <Marker
          coordinate={{ latitude: myLocation.latitude, longitude: myLocation.longitude }}
          pinColor='default'
        >
          <Callout tooltip={true}>
            <View style={{ backgroundColor: 'tomato' }}>
              <Text>
                내위치
              </Text>
            </View>
          </Callout>
        </Marker>
      )}
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
