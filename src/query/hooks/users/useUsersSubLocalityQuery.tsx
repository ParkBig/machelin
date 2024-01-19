import { axiosUsers } from 'query/api/user';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { myLocationState } from 'store/locationState';

interface Data {
  ok: boolean;
  msg: string;
  localityArr: string[];
  isKorea: boolean;
}

export default function useUsersSubLocalityQuery() {
  const { isGetLocation, latitude, longitude } = useRecoilValue(myLocationState);
  
  const {
    data: mySubLocality,
    refetch: reMySubLocality,
    isLoading: mySubLocalityIsLoading,
  } = useQuery<Data>(
    ['usersSubLocality', latitude, longitude],
    async () => {
      const { data } = await axiosUsers.get('/usersSubLocality', {
        params: {
          lat: latitude,
          lng: longitude,
        },
      });

      return data;
    },
    {
      enabled: !!isGetLocation,
    }
  );

  return { mySubLocality, reMySubLocality, mySubLocalityIsLoading };
}
