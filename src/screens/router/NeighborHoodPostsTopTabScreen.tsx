import { StatusBarHeight } from 'const/dimenstions';
import { Colors } from 'const/global-styles';
import NoticePostsScreen from 'screens/topTab/neighborHoodPostsTopTabScreen/NoticePostsScreen';
import PostsLikedScreen from 'screens/topTab/neighborHoodPostsTopTabScreen/PostsLikedScreen';
import PostsSearchScreen from 'screens/topTab/neighborHoodPostsTopTabScreen/PostsSearchScreen';
import { RootTobTab } from 'types/screenType';

export default function NeighborHoodPostsTopTabScreen() {
  return (
    <RootTobTab.Navigator
      style={{
        paddingTop: StatusBarHeight,
        backgroundColor: Colors.mainGreen2,
      }}
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.mainGreen2, elevation: 0, shadowOpacity: 0 },
        tabBarActiveTintColor: Colors.mainWhite3,
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.mainWhite3,
        },
      }}
    >
      <RootTobTab.Screen name="PostsSearchScreen" component={PostsSearchScreen} options={{ title: '게시글 검색' }} />
      <RootTobTab.Screen name="PostsLikedScreen" component={PostsLikedScreen} options={{ title: '좋아요' }} />
      <RootTobTab.Screen name="NoticePostsScreen" component={NoticePostsScreen} options={{ title: '공지사항' }} />
    </RootTobTab.Navigator>
  );
}
