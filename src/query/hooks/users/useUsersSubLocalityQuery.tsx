import { usersSubLocalityQuery } from 'query/user';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { myLocationState } from 'store/locationState';

interface Data {
  ok: boolean;
  msg: string;
  subLocality: string;
}

export default function useUsersSubLocalityQuery() {
  const { latitude, longitude } = useRecoilValue(myLocationState);

  const {
    data: mySubLocality,
    refetch: reMySubLocality,
    isLoading: mySubLocalityIsLoading,
  } = useQuery<Data>(['usersSubLocality', latitude, longitude], () => usersSubLocalityQuery(latitude, longitude));

  return { mySubLocality, reMySubLocality, mySubLocalityIsLoading };
}
