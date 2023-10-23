import { Colors, Size } from 'const/global-styles';
import EvaluatorsScreen from 'screens/EvaluatorsScreen';
import MainScreen from 'screens/MainScreen';
import MyListScreen from 'screens/MyListScreen';
import MachelinLankScreen from 'screens/MachelinLankScreen';
import { RootBottomTab } from 'types/screen/screenType';
import Button from 'components/common/Button';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTabScreen() {
  return (
    <RootBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.mainGreen2,
        },
      }}
    >
      <RootBottomTab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: '마슐맵스',
          tabBarIcon: () => (
            <Ionicons name='map' size={Size.bigMiddle} color={Colors.mainBlue1} />
          )
        }}
      />
      <RootBottomTab.Screen
        name="MachelinLankScreen"
        component={MachelinLankScreen}
        options={{
          title: '마슐랭크',
          tabBarIcon: () => (
            <Ionicons name='medal' size={Size.bigMiddle} color={Colors.mainBlue1} />
          )
        }}
      />
      <RootBottomTab.Screen
        name="EvaluatorsScreen"
        component={EvaluatorsScreen}
        options={{
          title: '평가단들',
          tabBarIcon: () => (
            <Ionicons name='boat' size={Size.bigMiddle} color={Colors.mainBlue1} />
          )
        }}
      />
      <RootBottomTab.Screen
        name="MyListScreen"
        component={MyListScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'left',
          title: '마슐랭',
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
