import { axiosUsers } from 'query/api/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';

interface Follower  {
  createdAt: Date;
  follower: UserInfo;
  id: number;
}

interface Data {
  ok: boolean;
  followers: Follower[];
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
