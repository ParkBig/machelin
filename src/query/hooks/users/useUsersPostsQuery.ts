import { PostQueryResponse, usersPostsQuery } from 'query/posts';
import { useInfiniteQuery } from 'react-query';
import useMyInfoQuery from './useMyInfoQuery';
import { IPost } from 'types/store/myInfoType';

export default function useUsersPostsQuery(targetId?: number) {
  const { myInfo } = useMyInfoQuery();
  const myId = myInfo?.authUser?.id;
  
  const {
    data: posts,
    isLoading: postsIsLoading,
    refetch: rePosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PostQueryResponse, unknown, IPost>(
    ['usersPostsTest', targetId, myId],
    ({ pageParam = 1 }) => usersPostsQuery(targetId, myId, pageParam),
    {
      select: data => ({ pages: data.pages.flatMap(page => page.posts), pageParams: data.pageParams }),
      getNextPageParam: lastPage => {
        return lastPage.nextPage || null;
      },
    }
  );

  const fetchNextPagePosts = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return { posts, postsIsLoading, rePosts, fetchNextPagePosts, isFetchingNextPage };
}
