import { atom } from 'recoil';

export interface MakeStampState {
  title: string;
  content: string;
  images: string[];
  restaurantInfo: {
    restaurantId: string;
    restaurantName: string;
    address: string;
  } | null;
}

export const makeStampState = atom<MakeStampState>({
  key: 'makeStampState',
  default: {
    title: '',
    content: '',
    images: [],
    restaurantInfo: null,
  },
});
