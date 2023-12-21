import { axiosPosts, usersPostForMyMapQuery } from 'query/posts';
import { useQuery } from 'react-query';
import { IPost } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  msg: string;
  posts: IPost[];
}

export default function useUsersPostForMyMapQuery(userId?: number) {
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
