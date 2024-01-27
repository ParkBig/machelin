import { RootStack } from 'types/screenType';
import { Colors } from 'const/global-styles';
import BottomTabScreen from './BottomTabScreen';
import MakePostScreen from 'screens/stack/MakePostScreen';
import RestaurantDetailScreen from 'screens/stack/RestaurantDetailScreen';
import LoginScreen from 'screens/stack/LoginScreen';
import SignUpScreen from 'screens/stack/SignUpScreen';
import ChangeMyNicknameScreen from 'screens/stack/ChangeMyNicknameScreen';
import ExploreUserInfoScreen from 'screens/stack/ExploreUserInfoScreen';
import MobileVerificationScreen from 'screens/stack/MobileVerificationScreen';
import ChangeMyActivityZoneScreen from 'screens/stack/ChangeMyActivityZoneScreen';
import ChangeMyPreferFoodsScreen from 'screens/stack/ChangeMyPreferFoodsScreen';
import ChangeMyPreferRestaurantScreen from 'screens/stack/ChangeMyPreferRestaurantScreen';
import ToggleFollow from 'components/stackScreen/ExploreUserInfoScreen/exploreUsersInfo/ToggleFollow';
import ToggleBookmark from 'components/stackScreen/restaurantDetailScreen/ToggleBookmark';
import FindMyIdScreen from 'screens/stack/FindMyIdScreen';
import MakePostButton from 'components/stackScreen/makePostScreen/makePostButton/MakePostButton';
import MakeStampScreen from 'screens/stack/MakeStampScreen';
import FindRestaurantInfoScreen from 'screens/stack/FindRestaurantInfoScreen';
import MakeStampButton from 'components/stackScreen/makeStampScreen/MakeStampButton';
import StampDetailScreen from 'screens/stack/StampDetailScreen';
import DeleteStampButton from 'components/stackScreen/stampDetailScreen/DeleteStampButton';
import TermsOfUseScreen from 'screens/stack/TermsOfUseScreen';
import NeighborHoodPostsTopTabScreen from './NeighborHoodPostsTopTabScreen';
import SettingScreen from 'screens/stack/SettingScreen';
import RestaurantDetailMapScreen from 'screens/stack/RestaurantDetailMapScreen';

export default function StackScreen() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        headerTintColor: Colors.mainWhite3,
        headerStyle: {
          backgroundColor: Colors.mainGreen2,
        },
      }}
    >
      <RootStack.Screen name="BottomTabScreen" component={BottomTabScreen} options={{ headerShown: false, title: '' }} />
      <RootStack.Screen
        name="NeighborHoodPostsTopTabScreen"
        component={NeighborHoodPostsTopTabScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MakePostScreen"
        component={MakePostScreen}
        options={({ route }) => ({
          title: '기록하기',
          headerRight: () => <MakePostButton restaurantInfo={route.params.restaurantInfo} />,
        })}
      />
      <RootStack.Screen
        name="FindRestaurantInfoScreen"
        component={FindRestaurantInfoScreen}
        options={({ route }) => ({
          title: route.params.forWhich === 'makePost' ? '식당태그하기' : '장소태그하기',
        })}
      />
      <RootStack.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: '상세보기',
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
      <RootStack.Screen name="TermsOfUseScreen" component={TermsOfUseScreen} options={{ title: '전화번호 인증하기' }} />
      <RootStack.Screen name="FindMyIdScreen" component={FindMyIdScreen} options={{ title: '나의 계정 찾기' }} />
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
          headerRight: () => <ToggleFollow exploreUserId={route.params.userId} />,
        })}
      />
      <RootStack.Screen
        name="MakeStampScreen"
        component={MakeStampScreen}
        options={{
          title: '도장찍기',
          headerRight: () => <MakeStampButton />,
        }}
      />
      <RootStack.Screen
        name="StampDetailScreen"
        component={StampDetailScreen}
        options={{
          title: '나의 도장',
          headerRight: () => <DeleteStampButton />,
        }}
      />
      <RootStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: '설정',
        }}
      />
      <RootStack.Screen
        name="RestaurantDetailMapScreen"
        component={RestaurantDetailMapScreen}
        options={{ title: '지도로 위치보기' }}
      />
    </RootStack.Navigator>
  );
}
