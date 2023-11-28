import { SearchName, SearchSubName } from 'data/administrativeDistrict';
import { atom } from 'recoil';

interface RegionalSettingsState {
  searchText: string;
  location: {
    city: SearchName;
    district: SearchSubName;
  };
}

interface MainSearchState {
  isTyping: boolean;
  mainSearchValue: string;
}

export const mainSearchState = atom<MainSearchState>({
  key: 'mainSearchState',
  default: {
    isTyping: false,
    mainSearchValue: '',
  },
});

export const regionalSettingsState = atom<RegionalSettingsState>({
  key: 'regionalSettingsState',
  default: {
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
