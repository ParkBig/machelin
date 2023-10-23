import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailRestaurant, responseRestaurant } from 'types/data/restaureant';

export type RootBottomTabParamList = {
  MainScreen: undefined;
  MyListScreen: undefined;
  MachelinLankScreen: undefined;
  EvaluatorsScreen: undefined;
};
export type RootStackParamList = {
  SelectLoginPlatformScreen: undefined;
  BottomTabScreen: undefined;
  MyMapScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  MyInfoSettingScreen: undefined;
  InstanceModifyMyInfoScreen: {
    modifyType: '닉네임 변경' | '이메일 변경';
  }
  MakePostScreen: {
    restaurantInfo: DetailRestaurant;
  };
  RestaurantDetailScreen: {
    restaurant: responseRestaurant;
  };
};
export type AllParmList = {
  // BottomTabScreen
  MainScreen: undefined;
  MyListScreen: undefined;
  MachelinLankScreen: undefined;
  EvaluatorsScreen: undefined;

  // StackScreen
  SelectLoginPlatformScreen: undefined;
  BottomTabScreen: undefined;
  MyMapScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  MyInfoSettingScreen: undefined;
  InstanceModifyMyInfoScreen: {
    modifyType: '닉네임 변경' | '이메일 변경';
  }
  MakePostScreen: {
    restaurantInfo: DetailRestaurant;
  };
  RestaurantDetailScreen: {
    restaurant: responseRestaurant;
  };
};
export type UseNavigation<T extends keyof AllParmList> = NavigationProp<AllParmList, T>;
export type UseRouter<T extends keyof AllParmList> = RouteProp<AllParmList, T>;
export type StackScreenPropsAbout<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type BottomTabScreenPropsAbout<T extends keyof RootBottomTabParamList> = BottomTabScreenProps<
  RootBottomTabParamList,
  T
>;

export const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();
export const RootStack = createNativeStackNavigator<RootStackParamList>();
