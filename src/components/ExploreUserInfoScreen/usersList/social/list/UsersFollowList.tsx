import { useRoute } from '@react-navigation/native';
import BriefUserInfo from 'components/myScreen/myList/social/list/BriefUserInfo';
import NoSocial from 'components/myScreen/myList/social/list/NoSocial';
import useExploreUsersFollowsQuery from 'query/hooks/exploreUsers/useExploreUsersFollowsQuery';
import { View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import { UserInfo } from 'types/store/myInfoType';

export default function UsersFollowList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { follows } = useExploreUsersFollowsQuery(params.userId);

  return (
    <View>
      {follows?.follows.length ? (
        follows?.follows.map((follow: UserInfo) => <BriefUserInfo key={follow.id} userInfo={follow} />)
      ) : (
        <NoSocial type="follow" />
      )}
    </View>
  );
}
