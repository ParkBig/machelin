import { axiosUsers } from 'query/api/user';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { searchNickNameState } from 'store/searchState';
import { UserInfo } from 'types/types';

interface Data {
  ok: boolean;
  users: UserInfo[];
}

export default function useUserSearchQuery() {
  const searchNickName = useRecoilValue(searchNickNameState);

  const {
    data: userList,
    refetch: reUserList,
    isLoading: userListIsLoading,
  } = useQuery<Data>(
    ['userList', searchNickName],
    async () => {
      const { data } = await axiosUsers.get('/findUsers', {
        params: {
          nickname: searchNickName,
        },
      });
      return data;
    },
    {
      enabled: !!searchNickName,
    }
  );

  return { userList, userListIsLoading, reUserList };
}
