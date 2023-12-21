import { useQuery } from 'react-query';
import useMyInfoQuery from './useMyInfoQuery';
import { axiosStamps, usersStampQuery } from 'query/stamps';
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
  } = useQuery<Data>(
    ['useUsersStamps'],
    async () => {
      const { data } = await axiosStamps.get('/usersStamp');
      return data;
    },
    {
      enabled: !!myInfo?.authUser,
    }
  );

  return { stamps, stampIsLoading, reStamps };
}
