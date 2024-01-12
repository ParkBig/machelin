import { Colors } from 'const/global-styles';
import { Platform, StatusBar } from 'react-native';
import NoticePostsScreen from 'screens/topTab/NoticePostsScreen';
import SearchPostsScreen from 'screens/topTab/SearchPostsScreen';
import { RootTobTab } from 'types/screenType';

export default function TopTabScreen() {
  return (
    <RootTobTab.Navigator
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.mainGreen2,
      }}
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.mainGreen2 },
        tabBarActiveTintColor: Colors.mainWhite3,
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.mainWhite3,
        },
      }}
    >
      <RootTobTab.Screen name="SearchPostsScreen" component={SearchPostsScreen} options={{ title: '게시글 검색' }} />
      <RootTobTab.Screen name="NoticePostsScreen" component={NoticePostsScreen} options={{ title: '공지사항' }} />
      {/* <RootTobTab.Screen name="PromotionPostsScreen" component={PromotionPostsScreen} options={{ title: '프로모션' }} /> */}
    </RootTobTab.Navigator>
  );
}
