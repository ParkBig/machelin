import { View } from 'react-native';
import { UserInfo } from 'types/store/myInfoType';
import BriefUserInfo from './BriefUserInfo';
import NoSocial from './NoSocial';
import { useEffect } from 'react';
import useUsersFollowsQuery from 'query/hooks/users/useUsersFollowsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function FollowList() {
  const { myInfo } = useMyInfoQuery();
  const { follows, reFollows } = useUsersFollowsQuery(myInfo?.authUser?.id);

  useEffect(() => {
    reFollows();
  }, [myInfo, reFollows])

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
