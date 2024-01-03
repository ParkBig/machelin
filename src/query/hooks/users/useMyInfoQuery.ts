import { axiosUsers } from 'query/api/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';
import { takeToken } from 'util/tokenDB';

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
  } = useQuery<Data>(['myInfo'], async () => {
    const token = await takeToken();

    if (!token) return { ok: true, authUser: null };

    const { data } = await axiosUsers.get('/me');
    return data;
  });

  return { myInfoIsLoading, isError, myInfo, isSuccess, reMyInfo, isRefetching };
}
