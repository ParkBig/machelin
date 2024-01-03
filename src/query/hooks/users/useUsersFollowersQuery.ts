import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';
import useMyInfoQuery from './useMyInfoQuery';
import { axiosUsers } from 'query/api/user';

interface Data {
  ok: boolean;
  followers: UserInfo[];
}

export default function useUsersFollowersQuery() {
  const { myInfo } = useMyInfoQuery();
  const userId = myInfo?.authUser?.id

  const {
    isLoading: followersIsLoading,
    isError,
    data: followers,
    isSuccess,
    refetch: reFollowers,
    isRefetching: isReFollowers,
  } = useQuery<Data>(['usersFollowers', userId], async () => {
    if (!userId) {
      return { ok: true, follows: null };
    }

    const { data } = await axiosUsers.get('/usersFollowers', {
      params: {
        userId,
      },
    });
    return data;
  });

  return { followers, followersIsLoading, isSuccess, reFollowers, isError, isReFollowers };
}
