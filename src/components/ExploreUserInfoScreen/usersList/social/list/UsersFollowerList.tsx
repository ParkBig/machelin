import { useRoute } from '@react-navigation/native';
import BriefUserInfo from 'components/myScreen/myList/social/list/BriefUserInfo';
import NoSocial from 'components/myScreen/myList/social/list/NoSocial';
import useExploreUsersFollowersQuery from 'query/hooks/exploreUsers/useExploreUsersFollowersQuery';
import { View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import { UserInfo } from 'types/store/myInfoType';

export default function UsersFollowerList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { followers } = useExploreUsersFollowersQuery(params.userId);

  return (
    <View>
      {followers?.followers.length ? (
        followers?.followers.map((follower: UserInfo) => <BriefUserInfo key={follower.id} userInfo={follower} />)
      ) : (
        <NoSocial type="follower" />
      )}
    </View>
  );
}
