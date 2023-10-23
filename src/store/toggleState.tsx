import { atom } from 'recoil';

export const toggleRestaurantsListState = atom<boolean>({
  key: 'toggleRestaurantList',
  default: false,
});

export const toggleSearchState = atom<boolean>({
  key: 'toggleSearchState',
  default: false,
});

export const toggleHeaderOptionState = atom<boolean>({
  key: 'toggleHeaderOption',
  default: false,
});
