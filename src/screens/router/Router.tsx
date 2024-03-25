import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './StackScreen';
import { StatusBar } from 'expo-status-bar';

export default function Router() {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <StackScreen />
    </NavigationContainer>
  );
}
