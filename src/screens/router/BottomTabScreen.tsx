import { Colors, Size } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from 'screens/bottomTab/MainScreen';
import RegionalSearchScreen from 'screens/bottomTab/RegionalSearchScreen';
import NeighborhoodPostsScreen from 'screens/bottomTab/NeighborhoodPostsScreen';
import { RootBottomTab } from 'types/screenType';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import LoginSignUpTopTabScreen from './LoginSignUpTopTabScreen';
import MyTopTabScreen from './MyTopTabScreen';

export default function BottomTabScreen() {
  const { myInfo } = useMyInfoQuery();

  return (
    <RootBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.mainGreen2,
        },
        tabBarActiveTintColor: Colors.mainWhite3,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <RootBottomTab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: '내주변',
          tabBarIcon: () => <Ionicons name="map" size={Size.bigMiddle} color={Colors.mainWhite3} />,
        }}
      />
      <RootBottomTab.Screen
        name="RegionalSearchScreen"
        component={RegionalSearchScreen}
        options={{
          title: '지역검색',
          tabBarIcon: () => <Ionicons name="search" size={Size.bigMiddle} color={Colors.mainWhite3} />,
        }}
      />
      <RootBottomTab.Screen
        name="NeighborhoodPostsScreen"
        component={NeighborhoodPostsScreen}
        options={{
          title: '동네소식',
          tabBarIcon: () => <Ionicons name="boat" size={Size.bigMiddle} color={Colors.mainWhite3} />,
        }}
      />
      <RootBottomTab.Screen
        name="MyScreen"
        component={myInfo?.authUser ? MyTopTabScreen : LoginSignUpTopTabScreen}
        options={{
          headerShown: false,
          title: '마슐랭',
          tabBarIcon: () => <Ionicons name="restaurant" size={Size.bigMiddle} color={Colors.mainWhite3} />,
        }}
      />
    </RootBottomTab.Navigator>
  );
}
