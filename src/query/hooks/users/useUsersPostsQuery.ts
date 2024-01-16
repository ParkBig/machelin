import { useInfiniteQuery } from 'react-query';
import useMyInfoQuery from './useMyInfoQuery';
import { IPost } from 'types/types';
import { PostQueryResponse, axiosPosts } from 'query/api/posts';

export default function useUsersPostsQuery() {
  const { myInfo } = useMyInfoQuery();
  const myId = myInfo?.authUser?.id;

  const {
    data: posts,
    isLoading: postsIsLoading,
    refetch: rePosts,
    isRefetching: isRePosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PostQueryResponse, unknown, IPost>(
    ['usersPosts', myId],
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

  return { posts, postsIsLoading, rePosts, fetchNextPagePosts, isFetchingNextPage, isRePosts };
}
