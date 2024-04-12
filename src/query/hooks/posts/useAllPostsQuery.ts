import { axiosPosts } from 'query/api/posts';
import { useInfiniteQuery } from 'react-query';
import { IPost } from 'types/types';

interface Data {
  ok: boolean;
  msg: string;
  allPosts: IPost[];
  nextPage: string;
}

export default function useAllPostsQuery() {
  const {
    data: allPosts,
    isLoading: allPostsIsLoading,
    isRefetching: isReAllPosts,
    refetch: reAllPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, IPost>(
    ['allPosts'],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosPosts.get('/allPosts', {
        params: {
          page: pageParam,
        },
      });

      return data;
    },
    {
      select: data => {
        return { pages: data.pages.flatMap(page => page.allPosts), pageParams: data.pageParams };
      },
      getNextPageParam: lastPage => {
        return lastPage.nextPage || null;
      },
    }
  );

  const fetchNextPageNeighborhoodPosts = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    allPosts,
    allPostsIsLoading,
    isReAllPosts,
    reAllPosts,
    fetchNextPageNeighborhoodPosts,
    isFetchingNextPage,
  };
}
