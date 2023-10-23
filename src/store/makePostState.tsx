import { atom } from 'recoil';

interface MakePostState {
  restaurantImages: string[];
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  images: string[];
  contents: string;
  score: number;
  isPublic: boolean;
}

export const makePostState = atom<MakePostState>({
  key: 'makePostState',
  default: {
    restaurantImages: [],
    restaurantId: '',
    restaurantName: '',
    restaurantAddress: '',
    images: [],
    contents: '',
    score: 0,
    isPublic: true,
  },
});
