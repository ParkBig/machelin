import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailRestaurant } from 'types/data/restaureant';

export type RootBottomTabParamList = {
  MainScreen: undefined;
  MachelinLankScreen: undefined;
  EvaluatorsScreen: undefined;
  MyScreen: undefined;
};
export type RootStackParamList = {
  BottomTabScreen: undefined;
  MyMapScreen: undefined;
  LoginScreen: undefined;
  MyInfoSettingScreen: undefined;
  MobileVerificationScreen: undefined;
  ChangeMyNicknameScreen: undefined;
  ChangeMyActivityZoneScreen: undefined;
  ChangeMyPreferFoodsScreen: undefined;
  ChangeMyPreferRestaurantScreen: undefined;
  SignUpScreen: {
    mobile: string;
  };
  ExploreUserInfoScreen: {
    userId: number;
  };
  MakePostScreen: {
    restaurantInfo: DetailRestaurant | null;
  };
  RestaurantDetailScreen: {
    restaurantName: string;
    restaurantId: string;
  };
};
export type AllParmList = {
  // BottomTabScreen
  MainScreen: undefined;
  MachelinLankScreen: undefined;
  EvaluatorsScreen: undefined;
  MyScreen: undefined;

  // StackScreen
  BottomTabScreen: undefined;
  MyMapScreen: undefined;
  LoginScreen: undefined;
  MyInfoSettingScreen: undefined;
  MobileVerificationScreen: undefined;
  ChangeMyNicknameScreen: undefined;
  ChangeMyActivityZoneScreen: undefined;
  ChangeMyPreferFoodsScreen: undefined;
  ChangeMyPreferRestaurantScreen: undefined;
  SignUpScreen: {
    mobile: string;
  };
  ExploreUserInfoScreen: {
    userId: number;
  };
  MakePostScreen: {
    restaurantInfo: DetailRestaurant | null;
  };
  RestaurantDetailScreen: {
    restaurantName: string;
    restaurantId: string;
  };
};
export type UseNavigation<T extends keyof AllParmList> = NavigationProp<AllParmList, T>;
export type UseRouter<T extends keyof AllParmList> = RouteProp<AllParmList, T>;
export type StackScreenPropsAbout<T extends keyof AllParmList> = NativeStackScreenProps<AllParmList, T>;
export type BottomTabScreenPropsAbout<T extends keyof AllParmList> = BottomTabScreenProps<AllParmList, T>;

export const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();
export const RootStack = createNativeStackNavigator<RootStackParamList>();
