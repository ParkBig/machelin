import { axiosPosts } from 'query/api/posts';
import { useInfiniteQuery } from 'react-query';
import { IPost } from 'types/types';
import useUsersSubLocalityQuery from '../users/useUsersSubLocalityQuery';

interface Data {
  ok: boolean;
  msg: string;
  neighborhoodPosts: IPost[];
  nextPage: string;
}

export default function useNeighborhoodPostsQuery() {
  const { mySubLocality } = useUsersSubLocalityQuery();
  const subLocality = mySubLocality?.subLocality

  const {
    data: neighborhoodPosts,
    isLoading: neighborhoodPostsIsLoading,
    isRefetching: isReNeighborhoodPosts,
    refetch: reNeighborhoodPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, IPost>(
    ['neighborhoodPosts', subLocality],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosPosts.get('/neighborhoodPosts', {
        params: {
          subLocality,
          page: pageParam,
        },
      });

      return data;
    },
    {
      enabled: !!subLocality,
      select: data => {
        return { pages: data.pages.flatMap(page => page.neighborhoodPosts), pageParams: data.pageParams };
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
    neighborhoodPosts,
    neighborhoodPostsIsLoading,
    isReNeighborhoodPosts,
    reNeighborhoodPosts,
    fetchNextPageNeighborhoodPosts,
    isFetchingNextPage,
  };
}
