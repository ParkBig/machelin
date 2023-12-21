import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './StackScreen';
import { useEffect, useState } from 'react';
import { initTokenDB } from 'util/tokenDB';
import { StatusBar } from 'expo-status-bar';

export default function Router() {
  const [tokenDBInit, setTokenDBInit] = useState(false);

  useEffect(() => {
    initTokenDB()
      .then(() => {
        setTokenDBInit(true);
      })
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <StackScreen />
    </NavigationContainer>
  );
}
