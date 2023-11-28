import { usersFollowsQuery } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  follows: UserInfo[];
}

export default function useExploreUsersFollowsQuery(userId?: number) {
  const {
    isLoading: followsIsLoading,
    isError,
    data: follows,
    isSuccess,
    refetch: reFollows,
  } = useQuery<Data>(['exploreUsersFollows'], () => usersFollowsQuery(userId));

  return { follows, followsIsLoading, isSuccess, reFollows, isError };
}
