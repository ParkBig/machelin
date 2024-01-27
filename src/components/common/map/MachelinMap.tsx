import { useEffect, useRef, useState } from 'react';
import MapView, { MapPressEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRecoilValue } from 'recoil';
import { focusedRestaurantState, mapLocationState, myLocationState } from 'store/locationState';
import { StyleSheet, View } from 'react-native';
import MapLoadFail from './MapLoadFail';
import { Colors } from 'const/global-styles';

interface Props {
  onPress?: (event: MapPressEvent) => void;
  children: React.ReactNode;
}

export default function MachelinMap({ onPress, children }: Props) {
  const mapRef = useRef<MapView>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isMapLoadFail, setIsMapLoadFail] = useState(false);
  const focusedRestaurant = useRecoilValue(focusedRestaurantState);
  const mapLocation = useRecoilValue(mapLocationState);

  const reloadHandler = () => {
    setIsMapReady(false);
    setIsMapLoadFail(false);
  };

  const onMapReadyHandler = () => {
    setIsMapReady(true);
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
    mapRef.current?.animateToRegion(
      {
        latitude: mapLocation.latitude,
        longitude: mapLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500
    );
  }, [mapLocation]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isMapReady) {
        setIsMapLoadFail(true);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isMapReady]);

  return (
    <View style={styles.wrap}>
      {isMapLoadFail ? (
        <MapLoadFail reloadHandler={reloadHandler} />
      ) : (
        <MapView
          ref={mapRef}
          loadingEnabled={true}
          loadingIndicatorColor={Colors.mainGreen2}
          loadingBackgroundColor={Colors.mainWhite1}
          showsMyLocationButton={false}
          showsCompass={false}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={mapLocation}
          initialRegion={mapLocation}
          onMapReady={onMapReadyHandler}
          onPress={onPress}
        >
          {children}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
