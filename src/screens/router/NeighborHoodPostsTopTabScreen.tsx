import { Colors, Size } from 'const/global-styles';
import { Platform, StatusBar } from 'react-native';
import NoticePostsScreen from 'screens/topTab/NoticePostsScreen';
import PostsLikedScreen from 'screens/topTab/PostsLikedScreen';
import PostsSearchScreen from 'screens/topTab/PostsSearchScreen';
import { RootTobTab } from 'types/screenType';

export default function NeighborHoodPostsTopTabScreen() {
  return (
    <RootTobTab.Navigator
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.mainGreen2,
      }}
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.mainGreen2, elevation: 0, shadowOpacity: 0,  },
        tabBarActiveTintColor: Colors.mainWhite3,
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: Size.normalBig },
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
