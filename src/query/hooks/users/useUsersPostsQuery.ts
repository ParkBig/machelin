import { PostQueryResponse, usersPostsQuery } from 'query/posts';
import { useQuery } from 'react-query';
import useMyInfoQuery from './useMyInfoQuery';

export default function useUsersPostsQuery(targetId?: number) {
  const { myInfo } = useMyInfoQuery();
  const myId = myInfo?.authUser?.id;

  const {
    isLoading: postsIsLoading,
    isError,
    data: posts,
    isSuccess,
    refetch: rePosts,
  } = useQuery<PostQueryResponse>(['usersPosts', targetId, myId], () => usersPostsQuery(targetId, myId));

  return { posts, postsIsLoading, isSuccess, rePosts, isError };
}
