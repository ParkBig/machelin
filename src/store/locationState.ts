import { atom } from 'recoil';
import { FocusedRestaurant, LocationSearchRadius, MapLocationState, MyLocationState } from 'types/store/locationType';

export const mapLocationState = atom<MapLocationState>({
  key: 'mapLocationState',
  default: {
    latitude: 37.4979,
    longitude: 127.0276,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
});

export const myLocationState = atom<MyLocationState>({
  key: 'myLocationState',
  default: {
    isGetLocation: false,
    latitude: 37.4979,
    longitude: 127.0276,
  },
});

export const searchRadiusState = atom<LocationSearchRadius>({
  key: 'searchRadiusState',
  default: '1000',
});

export const focusedRestaurantState = atom<FocusedRestaurant>({
  key: 'focusedRestaurant',
  default: {
    isFocused: false,
    id: null,
    latitude: null,
    longitude: null,
  },
});
