import { PostQueryResponse, usersPostsQuery } from 'query/posts';
import { useQuery } from 'react-query';
import { IPost, Like } from 'types/store/myInfoType';

export default function useExploreUsersPostsQuery(userId?: number) {
  const {
    isLoading: postsIsLoading,
    isError,
    data: posts,
    isSuccess,
    refetch: rePosts,
  } = useQuery<PostQueryResponse>(['exploreUsersPosts', userId], () => usersPostsQuery(userId));

  return { posts, postsIsLoading, isSuccess, rePosts, isError };
}
