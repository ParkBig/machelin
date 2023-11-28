import { atom } from 'recoil';

export type ClickedMyInfoListTypeState = 'bookMark' | 'posts' | 'follow';

export const clickedMyInfoListTypeState = atom<ClickedMyInfoListTypeState>({
  key: 'clickedMyInfoListTypeState',
  default: 'posts',
});

export const clickedExploreUserInfoListTypeState = atom<ClickedMyInfoListTypeState>({
  key: 'clickedExploreUserInfoListTypeState',
  default: 'posts',
});
