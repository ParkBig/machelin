import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialTopTabScreenProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GooglePlace, IStamp } from './types';

export type RootBottomTabParamList = {
  MainScreen: undefined;
  RegionalSearchScreen: undefined;
  NeighborhoodPostsScreen: undefined;
  MyScreen: undefined;
};
export type RootTopTabParamList = {
  LoginSignUpScreen: undefined;
  HowToUseScreen: undefined;

  MyInfoScreen: undefined;
  MyPostsScreen: undefined;
  MyBookMarkScreen: undefined;
  MyMapScreen: undefined;

  PostsSearchScreen: undefined;
  NoticePostsScreen: undefined;
  PostsLikedScreen: undefined;
};
export type RootStackParamList = {
  BottomTabScreen: undefined;
  NeighborHoodPostsTopTabScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  SettingScreen: undefined;
  FindMyIdScreen: undefined;
  MakeStampScreen: undefined;
  TermsOfUseScreen: undefined;
  ChangeMyNicknameScreen: undefined;
  RegionalSearchMapScreen: undefined;
  MobileVerificationScreen: undefined;
  ChangeMyPreferFoodsScreen: undefined;
  ChangeMyActivityZoneScreen: undefined;
  ChangeMyPreferRestaurantScreen: undefined;
  FindRestaurantInfoScreen: {
    forWhich: 'makePost' | 'stamp';
  };
  ExploreUserInfoScreen: {
    userId: number;
  };
  MakePostScreen: {
    restaurantInfo: GooglePlace | null;
  };
  RestaurantDetailScreen: {
    restaurantName: string;
    restaurantId: string;
  };
  StampDetailScreen: {
    stamp: IStamp;
  };
};
export type AllParmList = {
  // BottomTabScreen
  MainScreen: undefined;
  RegionalSearchScreen: undefined;
  NeighborhoodPostsScreen: undefined;
  MyScreen: undefined;

  // topTabScreen
  LoginSignUpScreen: undefined;
  HowToUseScreen: undefined;

  MyInfoScreen: undefined;
  MyPostsScreen: undefined;
  MyBookMarkScreen: undefined;
  MyMapScreen: undefined;

  PostsSearchScreen: undefined;
  NoticePostsScreen: undefined;
  PostsLikedScreen: undefined;

  // StackScreen
  BottomTabScreen: undefined;
  NeighborHoodPostsTopTabScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  SettingScreen: undefined;
  FindMyIdScreen: undefined;
  MakeStampScreen: undefined;
  TermsOfUseScreen: undefined;
  ChangeMyNicknameScreen: undefined;
  RegionalSearchMapScreen: undefined;
  MobileVerificationScreen: undefined;
  ChangeMyPreferFoodsScreen: undefined;
  ChangeMyActivityZoneScreen: undefined;
  ChangeMyPreferRestaurantScreen: undefined;
  FindRestaurantInfoScreen: {
    forWhich: 'makePost' | 'stamp';
  };
  ExploreUserInfoScreen: {
    userId: number;
  };
  MakePostScreen: {
    restaurantInfo: GooglePlace | null;
  };
  RestaurantDetailScreen: {
    restaurantName: string;
    restaurantId: string;
  };
  StampDetailScreen: {
    stamp: IStamp;
  };
};
export type UseNavigation<T extends keyof AllParmList> = NavigationProp<AllParmList, T>;
export type UseRouter<T extends keyof AllParmList> = RouteProp<AllParmList, T>;
export type BottomTabScreenPropsAbout<T extends keyof AllParmList> = BottomTabScreenProps<AllParmList, T>;
export type TopTamScreenPropsAbout<T extends keyof AllParmList> = MaterialTopTabScreenProps<AllParmList, T>
export type StackScreenPropsAbout<T extends keyof AllParmList> = NativeStackScreenProps<AllParmList, T>;

export const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();
export const RootTobTab = createMaterialTopTabNavigator<RootTopTabParamList>();
export const RootStack = createNativeStackNavigator<RootStackParamList>();
