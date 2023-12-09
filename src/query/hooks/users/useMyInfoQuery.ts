import { myInfoQuery } from 'query/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  authUser: UserInfo;
}

export default function useMyInfoQuery() {
  const {
    isLoading: myInfoIsLoading,
    isError,
    data: myInfo,
    isSuccess,
    refetch: reMyInfo,
    isRefetching,
  } = useQuery<Data>(['myInfo'], myInfoQuery);

  return { myInfoIsLoading, isError, myInfo, isSuccess, reMyInfo, isRefetching };
}
