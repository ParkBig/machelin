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

export type ClickedMyInfoListTypeState = 'bookMark' | 'posts' | 'follow';

export const clickedMyInfoListTypeState = atom<ClickedMyInfoListTypeState>({
  key: 'clickedMyInfoListTypeState',
  default: 'posts',
});

export const clickedExploreUserInfoListTypeState = atom<ClickedMyInfoListTypeState>({
  key: 'clickedExploreUserInfoListTypeState',
  default: 'posts',
});

