import { Colors, Size } from 'const/global-styles';
import { Platform, StatusBar } from 'react-native';
import HowToUseScreen from 'screens/topTab/loginSignUpTopTabScreen/HowToUseScreen';
import LoginSignUpScreen from 'screens/topTab/loginSignUpTopTabScreen/LoginSignUpScreen';
import { RootTobTab } from 'types/screenType';

export default function LoginSignUpTopTabScreen() {
  return (
    <RootTobTab.Navigator
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.mainGreen2,
      }}
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.mainGreen2, elevation: 0, shadowOpacity: 0 },
        tabBarActiveTintColor: Colors.mainWhite3,
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: Size.normalBig },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.mainWhite3,
        },
      }}
    >
      <RootTobTab.Screen
        name="LoginSignUpScreen"
        component={LoginSignUpScreen}
        options={{ title: '로그인/회원가입' }}
      />
      <RootTobTab.Screen name="HowToUseScreen" component={HowToUseScreen} options={{ title: '마슐랭 소개' }} />
    </RootTobTab.Navigator>
  );
}
