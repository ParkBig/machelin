import { myInfoQuery } from 'query/user';
import { useQuery } from 'react-query';
import { MyInfo } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  authUser: MyInfo;
}

export default function useMyInfoQuery() {
  const {
    isLoading,
    isError,
    data: myInfo,
    isSuccess,
    refetch: reMyInfo,
  } = useQuery<Data>(['myInfo'], myInfoQuery);

  return { isLoading, isError, myInfo, isSuccess, reMyInfo };
}
