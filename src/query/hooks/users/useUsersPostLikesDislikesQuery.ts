import { useQuery } from 'react-query';
import { Like } from 'types/types';
import useMyInfoQuery from './useMyInfoQuery';
import { axiosPosts } from 'query/api/posts';

interface Data {
  ok: boolean;
  msg: string;
  usersLikes: Like[];
  usersDislikes: Like[];
}

export default function useUsersPostLikesDislikesQuery() {
  const { myInfo } = useMyInfoQuery();
  const userId = myInfo?.authUser?.id

  const { data: usersPostLikesDislikes, refetch: reUsersPostLikesDislikes } = useQuery<Data>(
    ['usersPostLikesDislikes', userId],
    async () => {
      if (!userId) {
        return { ok: true, usersLikes: [], usersDislikes: [] };
      }

      const { data } = await axiosPosts.get('/usersPostLikesDislikes', {
        params: {
          userId,
        },
      });

      return data;
    }
  );

  return { usersPostLikesDislikes, reUsersPostLikesDislikes };
}
