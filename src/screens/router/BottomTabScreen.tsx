import { Colors, Size } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from 'screens/bottomTab/MainScreen';
import RegionalSearchScreen from 'screens/bottomTab/RegionalSearchScreen';
import MyScreen from 'screens/bottomTab/MyScreen';
import NeighborhoodPostsScreen from 'screens/bottomTab/NeighborhoodPostsScreen';
import { RootBottomTab } from 'types/screenType';

export default function BottomTabScreen() {
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
        component={MyScreen}
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerTitleAlign: 'left',
          title: '마슐랭',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.mainWhite3,
          },
          headerStyle: {
            backgroundColor: Colors.mainGreen2,
          },
          tabBarIcon: () => <Ionicons name="restaurant" size={Size.bigMiddle} color={Colors.mainWhite3} />,
        }}
      />
    </RootBottomTab.Navigator>
  );
}
