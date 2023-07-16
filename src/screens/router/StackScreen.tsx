import RestaurantDetailScreen from 'screens/RestaurantDetailScreen';
import { RootStack } from 'types/screen/screenType';

export default function StackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="RestaurantDetailScreen" component={RestaurantDetailScreen} />
    </RootStack.Navigator>
  );
}
