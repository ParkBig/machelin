import { usersFollowersQuery } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  followers: UserInfo[];
}

export default function useExploreUsersFollowersQuery(userId?: number) {
  const {
    isLoading: followersIsLoading,
    isError,
    data: followers,
    isSuccess,
    refetch: reFollowers,
  } = useQuery<Data>(['exploreUsersFollowers', userId], () => usersFollowersQuery(userId));

  return { followers, followersIsLoading, isSuccess, reFollowers, isError };
}
