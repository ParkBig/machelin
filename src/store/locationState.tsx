import { atom } from 'recoil';
import { MyLocationState } from 'types/store/locationType';

export const myLocationState = atom<MyLocationState>({
  key: 'myLocationState',
  default: {
    isGetLocation: false,
    latitude: 37.4979,
    longitude: 127.0276,
  },
});
