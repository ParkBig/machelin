import { SearchName, SearchSubName } from 'data/administrativeDistrict';
import { atom } from 'recoil';

interface SearchRestaurantsState {
  searchText: string;
  location: {
    city: SearchName;
    district: SearchSubName;
  }
}

export const searchRestaurantsState = atom<SearchRestaurantsState>({
  key: 'searchRestaurantsState',
  default: {
    searchText: '',
    location: {
      city: '전체',
      district: '전체',
    }
  },
});
