import MainScreen from 'screens/MainScreen';
import MyListScreen from 'screens/MyListScreen';
import { RootDrawer } from 'types/screen/screenType';
import StackScreen from './StackScreen';

export default function DrawerScreen() {
  return (
    <RootDrawer.Navigator
      useLegacyImplementation={true}
    >
      <RootDrawer.Screen name="MainScreen" component={MainScreen} />
      <RootDrawer.Screen name="MyListScreen" component={MyListScreen} />
      <RootDrawer.Screen name="StackScreen" component={StackScreen} />
    </RootDrawer.Navigator>
  );
}
