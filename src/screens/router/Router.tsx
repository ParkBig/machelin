import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './StackScreen';
import { useEffect, useState } from 'react';
import { initTokenDB } from 'util/tokenDB';

export default function Router() {
  const [tokenDBInit, setTokenDBInit] = useState(false);

  useEffect(() => {
    initTokenDB()
      .then(() => {
        setTokenDBInit(true);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
