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
  const { isTyping, searchText } = useRecoilValue(searchNickNameState);

  const {
    data: userList,
    refetch: reUserList,
    isLoading: userListIsLoading,
  } = useQuery<Data>(
    ['userList', searchText],
    async () => {
      const { data } = await axiosUsers.get('/findUsers', {
        params: {
          nickname: searchText,
        },
      });
      return data;
    },
    {
      enabled: isTyping ? false : searchText ? true : false,
    }
  );

  return { userList, userListIsLoading, reUserList };
}
