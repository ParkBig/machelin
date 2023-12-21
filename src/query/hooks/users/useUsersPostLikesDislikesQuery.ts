import { axiosPosts, usersPostLikesDislikesQuery } from 'query/posts';
import { useQuery } from 'react-query';
import { Like } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  msg: string;
  usersLikes: Like[];
  usersDislikes: Like[];
}

export default function useUsersPostLikesDislikesQuery(userId?: number) {
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
