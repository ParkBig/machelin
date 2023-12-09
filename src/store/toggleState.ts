import { atom } from 'recoil';

interface MapScreenTogglesState {
  toggleRestaurantList: boolean;
  toggleRestaurantSearch: boolean;
  toggleOptions: boolean;
}

export const mainScreenTogglesState = atom<MapScreenTogglesState>({
  key: 'mapScreenTogglesState',
  default: {
    toggleRestaurantList: false,
    toggleRestaurantSearch: false,
    toggleOptions: false,
  },
});

export const toggleRadiusSettingState = atom<boolean>({
  key: 'toggleSearchRadiusState',
  default: false,
});
