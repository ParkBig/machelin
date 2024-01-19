import { LayoutAnimation } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { focusedRestaurantState, mapLocationState } from 'store/locationState';
import { mainScreenTogglesState } from 'store/toggleState';
import MachelinMap from 'components/common/map/MachelinMap';
import MyLocationPing from 'components/common/map/MyLocationPing';
import RestaurantPings from './RestaurantPings';

export default function MainMap() {
  const setMapLocation = useSetRecoilState(mapLocationState);
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

  return (
    <MachelinMap onPress={mapPressHandler}>
      <MyLocationPing />
      <RestaurantPings />
    </MachelinMap>
  );
}
