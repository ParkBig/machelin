import { PostQueryResponse, usersPostsQuery } from 'query/posts';
import { useQuery } from 'react-query';

export default function useUsersPostsQuery(userId?: number) {
  const {
    isLoading: postsIsLoading,
    isError,
    data: posts,
    isSuccess,
    refetch: rePosts,
  } = useQuery<PostQueryResponse>(['usersPosts', userId], () => usersPostsQuery(userId));

  return { posts, postsIsLoading, isSuccess, rePosts, isError };
}
