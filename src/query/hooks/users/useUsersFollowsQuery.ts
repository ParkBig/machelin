import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';
import useMyInfoQuery from './useMyInfoQuery';
import { axiosUsers } from 'query/api/user';

interface Follow  {
  createdAt: Date;
  follow: UserInfo;
  id: number;
}

interface Data {
  ok: boolean;
  follows: Follow[];
}

export default function useUsersFollowsQuery() {
  const { myInfo } = useMyInfoQuery();
  const userId = myInfo?.authUser?.id;

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
