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

export const clickedExploreUserInfoListTypeState = atom<ClickedMyInfoListTypeState>({
  key: 'clickedExploreUserInfoListTypeState',
  default: 'posts',
});

export type ClickedMyMapListTypeState = 'bookmarks' | 'posts' | 'stamps' | null;

export const clickedMyMapListTypeState = atom<ClickedMyMapListTypeState>({
  key: 'clickedMyMapListTypeState',
  default: null,
});

export type WhichClickedInMyInfoSocialState = 'follow' | 'follower' | 'search' | null;

export const whichClickedInMyInfoSocialState = atom<WhichClickedInMyInfoSocialState>({
  key: 'whichClickedInMyInfoSocialState',
  default: null,
});

export const toggleNearbySearchState = atom({
  key: 'toggleNearbySearchState',
  default: false,
});
