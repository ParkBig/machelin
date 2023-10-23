import { ViewStyle } from 'react-native';

export const Colors = {
  /** main color~ */
  mainGreen1: '#c8e4aa',
  mainGreen2: '#B5D692',
  mainGreen3: '#63c163',
  mainWhite1: '#F0F8FF',
  mainWhite2: '#E0E0E0',
  mainBlue1: '#0084ffab',
  mainBlue2: '#037df0a1',

  /** gray color~ */
  superLightGray: '#e1dddd',
  lightGray: '#cccccc',
  gray: '#979797',
  darkGray: '#808080',

  /** platform color~ */
  kakaoBackground: '#FFEB34',
  googleBackground: '#C4482E',
  naverBackground: '#3FBE3E',
};

export const Size = {
  small: 11,

  normalSmall: 13,
  normalMiddle: 15,
  normalBig: 17,

  bigSmall: 19,
  bigMiddle: 21,
  bigBig: 23,
  bigSuper: 25,

  colossalSmall: 27,
  colossalMiddle: 29,
  colossalBig: 31,
  colossalSuper: 33,
};

export const Shadow: ViewStyle = {
  elevation: 4,
  shadowColor: 'black',
  shadowOpacity: 0.15,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 3,
};
