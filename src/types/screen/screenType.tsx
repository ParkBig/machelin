import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootDrawerParamList = {
  MainScreen: undefined;
  MyListScreen: undefined;
  StackScreen: undefined;
};
export type RootStackParamList = {
  RestaurantDetailScreen: undefined;
};
export type AllParmList = {
  MainScreen: undefined;
  MyListScreen: undefined;
  RestaurantDetailScreen: undefined;
};
export type UseNavigation<T extends keyof AllParmList> = NavigationProp<AllParmList, T>;
export type UseRouter<T extends keyof AllParmList> = RouteProp<AllParmList, T>;

export const RootDrawer = createDrawerNavigator<RootDrawerParamList>();
export const RootStack = createNativeStackNavigator<RootStackParamList>();
