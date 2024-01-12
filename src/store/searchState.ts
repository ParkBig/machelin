import { SearchName, SearchSubName } from 'const/administrativeDistrict';
import { atom } from 'recoil';

interface MainSearchState {
  isTyping: boolean;
  mainSearchValue: string;
}

interface RegionalRestaurantSearchInputState {
  isTyping: boolean;
  searchText: string;
  location: {
    city: SearchName;
    district: SearchSubName;
  };
}

interface PostSearchInputState {
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
      city: '전체',
      district: '전체',
    },
  },
});

export const searchNickNameState = atom<string>({
  key: 'searchNickNameState',
  default: '',
});

export const postSearchInputState = atom<PostSearchInputState>({
  key: 'postSearchInputState',
  default: {
    isTyping: false,
    searchText: '',
  },
});
