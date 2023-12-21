import { axiosUsers } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';

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
    isRefetching: isReFollows,
  } = useQuery<Data>(['usersFollows', userId], async () => {
    if (!userId) {
      return { ok: true, follows: null };
    }

    const { data } = await axiosUsers.get('/usersFollows', {
      params: {
        userId,
      },
    });
    return data;
  });

  return { follows, followsIsLoading, isSuccess, reFollows, isError, isReFollows };
}