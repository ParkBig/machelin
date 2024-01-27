import { SearchName, SearchSubName } from 'const/administrativeDistrict';
import { atom } from 'recoil';

interface MainSearchState {
  isTyping: boolean;
  mainSearchValue: string;
}

interface RegionalRestaurantSearchInputState {
  isTyping: boolean;
  searchText: string;
  location: Location;
}

export interface Location {
  city: SearchName;
  district: SearchSubName;
}

interface PostSearchInputState {
  isTyping: boolean;
  searchText: string;
}

interface SearchNickNameState {
  isTyping: boolean;
  searchText: string;
}

export const mainSearchState = atom<MainSearchState>({
  key: 'mainSearchState',
  default: {
    isTyping: false,
    mainSearchValue: '',
  },
});

export const regionalRestaurantSearchInputState = atom<RegionalRestaurantSearchInputState>({
  key: 'regionalRestaurantSearchInputState',
  default: {
    isTyping: false,
    searchText: '',
    location: {
      city: '내위치',
      district: '내위치',
    },
  },
});

export const searchNickNameState = atom<SearchNickNameState>({
  key: 'searchNickNameState',
  default: {
    isTyping: false,
    searchText: '',
  },
});

export const postSearchInputState = atom<PostSearchInputState>({
  key: 'postSearchInputState',
  default: {
    isTyping: false,
    searchText: '',
  },
});

export const regionalSearchState = atom<string>({
  key: 'regionalSearchState',
  default: '',
});
