import { Colors, Size } from 'const/global-styles';
import { Platform, StatusBar } from 'react-native';
import MyBookMarkScreen from 'screens/topTab/myTopTabScreen/MyBookMarkScreen';
import MyInfoScreen from 'screens/topTab/myTopTabScreen/MyInfoScreen';
import MyPostsScreen from 'screens/topTab/myTopTabScreen/MyPostsScreen';
import { RootTobTab } from 'types/screenType';
import MyMapScreen from 'screens/topTab/myTopTabScreen/MyMapScreen';

export default function MyTopTabScreen() {
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
      <RootTobTab.Screen name="MyInfoScreen" component={MyInfoScreen} options={{ title: '내정보' }} />
      <RootTobTab.Screen name="MyPostsScreen" component={MyPostsScreen} options={{ title: '내게시글' }} />
      <RootTobTab.Screen name="MyBookMarkScreen" component={MyBookMarkScreen} options={{ title: '내북마크' }} />
      <RootTobTab.Screen
        name="MyMapScreen"
        component={MyMapScreen}
        options={{
          title: '나의 지도',
        }}
      />
    </RootTobTab.Navigator>
  );
}
