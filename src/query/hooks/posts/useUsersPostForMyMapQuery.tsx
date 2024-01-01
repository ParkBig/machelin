import { axiosPosts } from 'query/posts';
import { useQuery } from 'react-query';
import { IPost } from 'types/types';
import useMyInfoQuery from '../users/useMyInfoQuery';

interface Data {
  ok: boolean;
  msg: string;
  posts: IPost[];
}

export default function useUsersPostForMyMapQuery() {
  const { myInfo } = useMyInfoQuery();
  const userId = myInfo?.authUser?.id;

  const {
    data: posts,
    refetch: rePosts,
    isLoading: postsIsLoading,
  } = useQuery<Data>(['usersPostForMyMap', userId], async () => {
    if (!userId) {
      return { ok: true, posts: null };
    }

    const { data } = await axiosPosts.get('/usersPostForMyMap', {
      params: {
        userId,
      },
    });
    return data;
  });

  return { posts, rePosts, postsIsLoading };
}
