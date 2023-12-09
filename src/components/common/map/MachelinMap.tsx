import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useEffect, useRef, useState } from 'react';
import MapView, { MapPressEvent } from 'react-native-maps';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { focusedRestaurantState, mapLocationState, myLocationState } from 'store/locationState';
import { MapLocationState } from 'types/store/locationType';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { StyleSheet } from 'react-native';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';

interface Props {
  onPress?: (event: MapPressEvent) => void;
  children: React.ReactNode;
}

export default function MachelinMap({ onPress, children }: Props) {
  const mapRef = useRef<MapView>(null);
  const setMyLocation = useSetRecoilState(myLocationState);
  const focusedRestaurant = useRecoilValue(focusedRestaurantState);
  const [mapLocation, setMapLocation] = useRecoilState(mapLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

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
        setToggleAlertModal({ toggle: true, alertMsg: '위치 접근 권한이 필요합니다' });
        return;
      }

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
  }, [setMyLocation, setMapLocation, setToggleAlertModal]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      region={mapLocation}
      initialRegion={mapLocation}
      onPress={onPress}
      onRegionChangeComplete={onRegionChangeHandler}
    >
      {children}
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
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
