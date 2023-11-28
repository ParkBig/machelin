import { atom } from 'recoil';

export interface MakePostState {
  images: string[];
  contents: string;
  hashtags: string;
  rating: number;
  isPublic: boolean;
}

export const makePostState = atom<MakePostState>({
  key: 'makePostState',
  default: {
    images: [],
    contents: '',
    hashtags: '',
    rating: 0,
    isPublic: true,
  },
});
