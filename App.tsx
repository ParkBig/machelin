import Test from 'components/mainScreen/Test';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import Router from 'screens/router/Router';

export default function App() {
  return (
    <RecoilRoot>
      <StatusBar style='auto' />
      <Router />
      {/* <Test /> */}
    </RecoilRoot>
  );
}
