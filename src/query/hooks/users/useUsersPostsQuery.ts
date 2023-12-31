import { PostQueryResponse, axiosPosts } from 'query/posts';
import { useInfiniteQuery } from 'react-query';
import useMyInfoQuery from './useMyInfoQuery';
import { IPost } from 'types/types';

export default function useUsersPostsQuery() {
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
    ['usersPostsTest', myId],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosPosts.get('/usersPosts', {
        params: {
          targetId: myId,
          myId,
          page: pageParam,
        },
      });
      return data;
    },
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
