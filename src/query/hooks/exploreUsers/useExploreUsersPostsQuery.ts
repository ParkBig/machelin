import { usersPostsQuery } from 'query/user';
import { useQuery } from 'react-query';
import { IPost, Like } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  posts: IPost[];
  likes: Like[];
  dislikes: Like[];
}

export default function useExploreUsersPostsQuery(userId?: number) {
  const {
    isLoading: postsIsLoading,
    isError,
    data: posts,
    isSuccess,
    refetch: rePosts,
  } = useQuery<Data>(['exploreUsersPosts'], () => usersPostsQuery(userId));

  return { posts, postsIsLoading, isSuccess, rePosts, isError };
}
