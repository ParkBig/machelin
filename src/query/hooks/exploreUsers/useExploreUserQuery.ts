import { axiosUsers } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';

interface Data {
  ok: boolean;
  exploreUser: UserInfo;
}

export default function useExploreUserQuery(userId: number) {
  const {
    isLoading: exploreUserInfoIsLoading,
    isError,
    data: exploreUser,
    isSuccess,
    refetch: reExploreUser,
  } = useQuery<Data>(['useExploreUserQuery', userId], async () => {
    const { data } = await axiosUsers.get('/exploreUser', {
      params: {
        userId,
      },
    });
    return data;
  });

  return { exploreUserInfoIsLoading, isError, exploreUser, isSuccess, reExploreUser };
}
