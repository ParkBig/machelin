import { usersFollowsQuery } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  follows: UserInfo[];
}

export default function useUsersFollowsQuery(userId?: number) {
  const {
    isLoading: followsIsLoading,
    isError,
    data: follows,
    isSuccess,
    refetch: reFollows,
  } = useQuery<Data>(['usersFollows', userId], () => usersFollowsQuery(userId));

  return { follows, followsIsLoading, isSuccess, reFollows, isError };
}
