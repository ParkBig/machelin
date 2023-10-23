import RestaurantDetailScreen from 'screens/RestaurantDetailScreen';
import { RootStack, StackScreenPropsAbout } from 'types/screen/screenType';
import BottomTabScreen from './BottomTabScreen';
import { Colors } from 'const/global-styles';
import MyMapScreen from 'screens/MyMapScreen';
import SelectLoginPlatformScreen from 'screens/SelectLoginPlatformScreen';
import LoginScreen from 'screens/LoginScreen';
import SignUpScreen from 'screens/SignUpScreen';
import MakePostScreen from 'screens/MakePostScreen';
import MyInfoSettingScreen from 'screens/MyInfoSettingScreen';
import InstanceModifyMyInfoScreen from 'screens/InstanceModifyMyInfoScreen';

export default function StackScreen() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <RootStack.Screen name="BottomTabScreen" component={BottomTabScreen} options={{ headerShown: false }} />
      <RootStack.Screen
        name="MakePostScreen"
        component={MakePostScreen}
        options={{
          title: '기록하기',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: Colors.mainGreen2,
          },
        }}
      />
      <RootStack.Screen
        name="MyMapScreen"
        component={MyMapScreen}
        options={{
          title: '나의 보물지도',
        }}
      />
      <RootStack.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.mainGreen2,
          },
        }}
      />
      <RootStack.Screen
        name="SelectLoginPlatformScreen"
        component={SelectLoginPlatformScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: '이메일로 로그인',
        }}
      />
      <RootStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: '회원가입',
        }}
      />
      <RootStack.Screen
        name="MyInfoSettingScreen"
        component={MyInfoSettingScreen}
        options={{
          title: '내 정보 수정',
          headerStyle: {
            backgroundColor: Colors.mainGreen2,
          },
        }}
      />
      <RootStack.Screen
        name="InstanceModifyMyInfoScreen"
        component={InstanceModifyMyInfoScreen}
        options={({ navigation, route }: StackScreenPropsAbout<'InstanceModifyMyInfoScreen'>) => ({
          title: route.params.modifyType,
          headerStyle: {
            backgroundColor: Colors.mainGreen2,
          },
        })}
      />
    </RootStack.Navigator>
  );
}
