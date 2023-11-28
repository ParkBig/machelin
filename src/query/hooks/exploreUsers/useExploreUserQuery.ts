import { exploreUserQuery } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/store/myInfoType';

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
  } = useQuery<Data>(['useExploreUserQuery'], () => exploreUserQuery(userId));

  return { exploreUserInfoIsLoading, isError, exploreUser, isSuccess, reExploreUser };
}
