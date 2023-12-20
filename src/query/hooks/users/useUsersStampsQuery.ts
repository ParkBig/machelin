import { useQuery } from 'react-query';
import useMyInfoQuery from './useMyInfoQuery';
import { usersStampQuery } from 'query/stamps';
import { IStamp } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  msg: string;
  stamps: IStamp[];
}

export default function useUsersStampsQuery() {
  const { myInfo } = useMyInfoQuery();

  const {
    data: stamps,
    isLoading: stampIsLoading,
    refetch: reStamps,
  } = useQuery<Data>(['useUsersStamps'], () => usersStampQuery(), {
    enabled: !!myInfo?.authUser,
  });

  return { stamps, stampIsLoading, reStamps };
}
