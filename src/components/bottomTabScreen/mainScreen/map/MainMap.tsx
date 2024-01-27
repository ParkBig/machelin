import { LayoutAnimation } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { focusedRestaurantState, mapLocationState, myLocationState } from 'store/locationState';
import { mainScreenTogglesState } from 'store/toggleState';
import MachelinMap from 'components/common/map/MachelinMap';
import MyLocationPing from 'components/common/map/MyLocationPing';
import RestaurantPings from './RestaurantPings';
import { useEffect } from 'react';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export default function MainMap() {
  const setMyLocation = useSetRecoilState(myLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);
  const [focusedRestaurant, setFocusedRestaurant] = useRecoilState(focusedRestaurantState);
  const [mainScreenToggles, setMainScreenToggles] = useRecoilState(mainScreenTogglesState);

  const mapPressHandler = () => {
    if (mainScreenToggles.toggleRestaurantList) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMainScreenToggles(prev => ({ ...prev, toggleRestaurantList: false }));
    }
    if (mainScreenToggles.toggleRestaurantSearch || mainScreenToggles.toggleOptions) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMainScreenToggles(prev => ({ ...prev, toggleRestaurantSearch: false, toggleOptions: false }));
    }
    if (focusedRestaurant.isFocused) {
      setFocusedRestaurant({ isFocused: false, id: null, latitude: null, longitude: null });
    }
  };

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
    <MachelinMap onPress={mapPressHandler}>
      <MyLocationPing />
      <RestaurantPings />
    </MachelinMap>
  );
}
