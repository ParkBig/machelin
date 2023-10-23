import { atom } from 'recoil';

export const toggleRadiusSettingState = atom<boolean>({
  key: 'toggleSearchRadiusState',
  default: false,
});
