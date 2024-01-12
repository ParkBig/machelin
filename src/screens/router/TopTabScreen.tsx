import NoticePostsScreen from 'screens/topTab/NoticePostsScreen';
import PromotionPostsScreen from 'screens/topTab/PromotionPostsScreen';
import SearchPostsScreen from 'screens/topTab/SearchPostsScreen';
import { RootTobTab } from 'types/screenType';

export default function TopTabScreen() {
  return (
    <RootTobTab.Navigator>
      <RootTobTab.Screen name="SearchPostsScreen" component={SearchPostsScreen} />
      <RootTobTab.Screen name="NoticePostsScreen" component={NoticePostsScreen} />
      <RootTobTab.Screen name="PromotionPostsScreen" component={PromotionPostsScreen} />
    </RootTobTab.Navigator>
  );
}
