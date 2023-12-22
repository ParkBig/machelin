import { atom } from 'recoil';

export interface MapLocationState {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MyLocationState {
  isGetLocation: boolean;
  latitude: number;
  longitude: number;
}

export type LocationSearchRadius = '500' | '1000' | '1500' | '2000' | '3000';

interface FocusedRestaurant {
  isFocused: boolean;
  id: string | null;
  latitude: number | null;
  longitude: number | null;
}

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
