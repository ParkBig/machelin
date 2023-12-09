import { usersPostForMyMapQuery } from 'query/posts';
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
  } = useQuery<Data>(['usersPostForMyMap', userId], () => usersPostForMyMapQuery(userId));

  return { posts, rePosts, postsIsLoading };
}
