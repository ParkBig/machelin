import { View } from 'react-native';
import NoSocial from './NoSocial';
import { UserInfo } from 'types/store/myInfoType';
import BriefUserInfo from './BriefUserInfo';
import { useEffect } from 'react';
import useUsersFollowersQuery from 'query/hooks/users/useUsersFollowersQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function FollowerList() {
  const { myInfo } = useMyInfoQuery();
  const { followers, reFollowers } = useUsersFollowersQuery(myInfo?.authUser?.id);

  useEffect(() => {
    reFollowers();
  }, [myInfo, reFollowers])

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
