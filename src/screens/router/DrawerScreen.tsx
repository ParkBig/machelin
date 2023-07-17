import MainScreen from 'screens/MainScreen';
import MyListScreen from 'screens/MyListScreen';
import { RootDrawer } from 'types/screen/screenType';
import StackScreen from './StackScreen';

export default function DrawerScreen() {
  return (
    <RootDrawer.Navigator
      useLegacyImplementation={true}
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <RootDrawer.Screen name="MainScreen" component={MainScreen} options={{
        title: "Ma슐랭"
      }} />
      <RootDrawer.Screen name="MyListScreen" component={MyListScreen} options={{
        title: "Ma슐랭 가이드"
      }} />
      <RootDrawer.Screen name="StackScreen" component={StackScreen} options={{
        headerShown: false,
      }} />
    </RootDrawer.Navigator>
  );
}
