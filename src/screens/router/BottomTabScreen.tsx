import { Colors, Size } from 'const/global-styles';
import { RootBottomTab } from 'types/screen/screenType';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from 'screens/bottomTab/MainScreen';
import RegionalSearchScreen from 'screens/bottomTab/RegionalSearchScreen';
import EvaluatorsScreen from 'screens/bottomTab/EvaluatorsScreen';
import MyScreen from 'screens/bottomTab/MyScreen';

export default function BottomTabScreen() {
  return (
    <RootBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: Colors.mainWhite3,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: Colors.mainGreen2,
        },
        tabBarStyle: {
          backgroundColor: Colors.mainGreen2,
        },
      }}
    >
      <RootBottomTab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: '내주변',
          tabBarIcon: () => (
            <Ionicons name='map' size={Size.bigMiddle} color={Colors.mainBlue1} />
          )
        }}
      />
      <RootBottomTab.Screen
        name="RegionalSearchScreen"
        component={RegionalSearchScreen}
        options={{
          title: '지역검색',
          tabBarIcon: () => (
            <Ionicons name='search' size={Size.bigMiddle} color={Colors.mainBlue1} />
          )
        }}
      />
      <RootBottomTab.Screen
        name="EvaluatorsScreen"
        component={EvaluatorsScreen}
        options={{
          title: '동네소식',
          tabBarIcon: () => (
            <Ionicons name='boat' size={Size.bigMiddle} color={Colors.mainBlue1} />
          )
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
            fontWeight: 'bold'
          },
          headerStyle: {
            backgroundColor: Colors.mainGreen2,
          },
          tabBarIcon: () => (
            <Ionicons name='restaurant' size={Size.bigMiddle} color={Colors.mainBlue1} />
          )
        }}
      />
    </RootBottomTab.Navigator>
  );
}
