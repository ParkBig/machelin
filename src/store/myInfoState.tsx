import { atom } from 'recoil';

export type ClickedTypeState = 'bookMark' | 'posts' | 'follow';

export const clickedTypeState = atom<ClickedTypeState>({
  key: 'clickedTypeState',
  default: 'bookMark',
});
