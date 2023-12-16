import { usersFollowersQuery } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  followers: UserInfo[];
}

export default function useUsersFollowersQuery(userId?: number) {
  const {
    isLoading: followersIsLoading,
    isError,
    data: followers,
    isSuccess,
    refetch: reFollowers,
    isRefetching: isReFollowers,
  } = useQuery<Data>(['usersFollowers', userId], () => usersFollowersQuery(userId));

  return { followers, followersIsLoading, isSuccess, reFollowers, isError, isReFollowers };
}
