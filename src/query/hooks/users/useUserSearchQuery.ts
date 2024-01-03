import { axiosUsers } from 'query/api/user';
import { useQuery } from 'react-query';
import { UserInfo } from 'types/types';

interface Data {
  ok: boolean;
  users: UserInfo[];
}

export default function useUserSearchQuery(nickname: string) {
  const {
    data: userList,
    refetch: reUserList,
    isLoading,
  } = useQuery<Data>(
    ['userList', nickname],
    async () => {
      const { data } = await axiosUsers.get('/findUsers', {
        params: {
          nickname,
        },
      });
      return data;
    },
    {
      enabled: !!nickname,
    }
  );

  return { userList, isLoading, reUserList };
}
