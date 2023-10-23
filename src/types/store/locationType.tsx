export interface MapLocationState {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MyLocationState {
  isGetLocation: boolean;
  latitude: number;
  longitude: number;
}

export type LocationSearchRadius = 1000 | 2000 | 3000 | 4000 | 5000;

export interface FocusedRestaurant {
  isFocused: boolean;
  id: string | null;
  latitude: number | null;
  longitude: number | null;
}
