import { useQuery } from 'react-query';
import { axiosUsers } from 'query/api/user';

interface MyBlockedUsers {
  createdAt: Date;
  blockedUserId: number;
  id: number;
}

interface Data {
  ok: boolean;
  myBlockedUsers: MyBlockedUsers[];
}

export default function useMyBlockedUsersQuery() {
  const {
    isLoading: myBlockedUsersIsLoading,
    isError,
    data: myBlockedUsers,
    isSuccess,
    refetch: reMyBlockedUsers,
    isRefetching: isMyBlockedUsers,
  } = useQuery<Data>(['useUsersBlocked'], async () => {
    const { data } = await axiosUsers.get('/myBlockedUsers');
    return data;
  });

  return { myBlockedUsersIsLoading, myBlockedUsers, isSuccess, reMyBlockedUsers, isError, isMyBlockedUsers };
}
