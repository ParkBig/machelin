import { RootStack } from 'types/screenType';
import { Colors } from 'const/global-styles';
import BottomTabScreen from './BottomTabScreen';
import MakePostScreen from 'screens/stack/MakePostScreen';
import MyMapScreen from 'screens/stack/MyMapScreen';
import RestaurantDetailScreen from 'screens/stack/RestaurantDetailScreen';
import LoginScreen from 'screens/stack/LoginScreen';
import SignUpScreen from 'screens/stack/SignUpScreen';
import MyInfoSettingScreen from 'screens/stack/MyInfoSettingScreen';
import ChangeMyNicknameScreen from 'screens/stack/ChangeMyNicknameScreen';
import ExploreUserInfoScreen from 'screens/stack/ExploreUserInfoScreen';
import MobileVerificationScreen from 'screens/stack/MobileVerificationScreen';
import ChangeMyActivityZoneScreen from 'screens/stack/ChangeMyActivityZoneScreen';
import ChangeMyPreferFoodsScreen from 'screens/stack/ChangeMyPreferFoodsScreen';
import ChangeMyPreferRestaurantScreen from 'screens/stack/ChangeMyPreferRestaurantScreen';
import ToggleFollow from 'components/stackScreen/ExploreUserInfoScreen/exploreUsersInfo/ToggleFollow';
import ToggleBookmark from 'components/stackScreen/restaurantDetailScreen/ToggleBookmark';
import FindMyIdScreen from 'screens/stack/FindMyIdScreen';
import FindRestaurantInfoForMakePostScreen from 'screens/stack/FindRestaurantInfoForMakePostScreen';
import RegionalSearchMapScreen from 'screens/stack/RegionalSearchMapScreen';
import MakePostButton from 'components/stackScreen/makePostScreen/makePostButton/MakePostButton';
import StampButton from 'components/stackScreen/myMapScreen/StampButton';
import MakeStampScreen from 'screens/stack/MakeStampScreen';

export default function StackScreen() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Colors.mainWhite3,
        headerStyle: {
          backgroundColor: Colors.mainGreen2,
        },
      }}
    >
      <RootStack.Screen name="BottomTabScreen" component={BottomTabScreen} options={{ headerShown: false }} />
      <RootStack.Screen
        name="MakePostScreen"
        component={MakePostScreen}
        options={({ route }) => ({
          title: '기록하기',
          headerTitleAlign: 'left',
          headerRight: () => <MakePostButton restaurantInfo={route.params.restaurantInfo} />,
        })}
      />
      <RootStack.Screen
        name="FindRestaurantInfoForMakePostScreen"
        component={FindRestaurantInfoForMakePostScreen}
        options={{
          title: '식당태그하기',
        }}
      />
      <RootStack.Screen
        name="MyMapScreen"
        component={MyMapScreen}
        options={{
          headerTitleAlign: 'left',
          title: '나의 지도',
          headerRight: () => <StampButton />,
        }}
      />
      <RootStack.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: route.params.restaurantName,
          headerRight: () => <ToggleBookmark restaurantId={route.params.restaurantId} />,
        })}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: '로그인',
        }}
      />
      <RootStack.Screen
        name="MobileVerificationScreen"
        component={MobileVerificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: '회원가입',
        }}
      />
      <RootStack.Screen name="FindMyIdScreen" component={FindMyIdScreen} options={{ title: '나의 계정 찾기' }} />
      <RootStack.Screen
        name="MyInfoSettingScreen"
        component={MyInfoSettingScreen}
        options={{
          title: '내 정보 수정',
        }}
      />
      <RootStack.Screen
        name="ChangeMyNicknameScreen"
        component={ChangeMyNicknameScreen}
        options={{
          title: '닉네임 변경',
        }}
      />
      <RootStack.Screen
        name="ChangeMyActivityZoneScreen"
        component={ChangeMyActivityZoneScreen}
        options={{
          title: '활동구역 변경',
        }}
      />
      <RootStack.Screen
        name="ChangeMyPreferFoodsScreen"
        component={ChangeMyPreferFoodsScreen}
        options={{
          title: '선호음식 변경',
        }}
      />
      <RootStack.Screen
        name="ChangeMyPreferRestaurantScreen"
        component={ChangeMyPreferRestaurantScreen}
        options={{
          title: '최애식당 변경',
        }}
      />
      <RootStack.Screen
        name="ExploreUserInfoScreen"
        component={ExploreUserInfoScreen}
        options={({ route }) => ({
          title: '탐험중...',
          headerTitleAlign: 'left',
          headerRight: () => <ToggleFollow exploreUserId={route.params.userId} />,
        })}
      />
      <RootStack.Screen
        name="RegionalSearchMapScreen"
        component={RegionalSearchMapScreen}
        options={{
          title: '검색 결과',
        }}
      />
      <RootStack.Screen
        name="MakeStampScreen"
        component={MakeStampScreen}
        options={{
          title: '도장찍기',
          headerTitleAlign: 'left',
        }}
      />
    </RootStack.Navigator>
  );
}
