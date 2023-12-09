import { PostQueryResponse, usersPostsQuery } from 'query/posts';
import { useQuery } from 'react-query';
import useMyInfoQuery from '../users/useMyInfoQuery';

export default function useExploreUsersPostsQuery(targetId: number) {
  const { myInfo } = useMyInfoQuery();
  const myId = myInfo?.authUser?.id;

  const {
    isLoading: postsIsLoading,
    isError,
    data: posts,
    isSuccess,
    refetch: rePosts,
  } = useQuery<PostQueryResponse>(['exploreUsersPosts', targetId, myId], () => usersPostsQuery(targetId, myId));

  return { posts, postsIsLoading, isSuccess, rePosts, isError };
}
