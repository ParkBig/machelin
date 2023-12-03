import { useRoute } from '@react-navigation/native';
import LoadingOverlay from 'components/common/LoadingOverlay';
import BriefUserInfo from 'components/myScreen/myList/social/list/BriefUserInfo';
import NoSocial from 'components/myScreen/myList/social/list/NoSocial';
import useExploreUsersFollowsQuery from 'query/hooks/exploreUsers/useExploreUsersFollowsQuery';
import { View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import { UserInfo } from 'types/store/myInfoType';

export default function UsersFollowList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { follows, followsIsLoading } = useExploreUsersFollowsQuery(params.userId);
  const followsExist = follows?.follows?.length !== 0;

  return (
    <View>
      {followsIsLoading ? (
        <LoadingOverlay />
      ) : followsExist ? (
        follows?.follows?.map((follow: UserInfo) => <BriefUserInfo key={follow.id} userInfo={follow} />)
      ) : (
        <NoSocial type="follow" />
      )}
    </View>
  );
}
