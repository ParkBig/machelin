import { axiosUsers } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';

interface Data {
  ok: boolean;
  followers: UserInfo[];
}

export default function useExploreUsersFollowersQuery(userId: number) {
  const {
    isLoading: followersIsLoading,
    isError,
    data: followers,
    isSuccess,
    refetch: reFollowers,
    isRefetching: isReFollowers,
  } = useQuery<Data>(['exploreUsersFollowers', userId], async () => {
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
