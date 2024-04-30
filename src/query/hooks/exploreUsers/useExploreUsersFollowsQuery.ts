import { axiosUsers } from 'query/api/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';

interface Follow  {
  createdAt: Date;
  follow: UserInfo;
  id: number;
}

interface Data {
  ok: boolean;
  follows: Follow[];
}

export default function useExploreUsersFollowsQuery(userId: number) {
  const {
    isLoading: followsIsLoading,
    isError,
    data: follows,
    isSuccess,
    refetch: reFollows,
    isRefetching: isReFollows,
  } = useQuery<Data>(['exploreUsersFollows', userId], async () => {
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
