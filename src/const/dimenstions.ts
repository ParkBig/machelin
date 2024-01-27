import { getStatusBarHeight } from 'react-native-safearea-height';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';
import { StatusBar, Platform } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const ScreenHeight = height;
export const ScreenWidth = width;

const iphoneXBarHeight = isIphoneX() ? getStatusBarHeight(true) + getBottomSpace() : getStatusBarHeight(true);
export const StatusBarHeight = Platform.OS === 'ios' ? iphoneXBarHeight : StatusBar.currentHeight;
