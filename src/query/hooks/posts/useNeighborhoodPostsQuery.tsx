import { neighborhoodPostsQuery } from 'query/posts';
import { useInfiniteQuery } from 'react-query';
import { IPost } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  msg: string;
  neighborhoodPosts: IPost[];
  nextPage: string;
}

export default function useNeighborhoodPostsQuery(subLocality: string = '') {
  const {
    data: neighborhoodPosts,
    isLoading: neighborhoodPostsIsLoading,
    refetch: reNeighborhoodPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, IPost>(
    ['neighborhoodPosts', subLocality],
    ({ pageParam = 1 }) => neighborhoodPostsQuery(subLocality, pageParam),
    {
      enabled: !!subLocality,
      select: data => ({ pages: data.pages.flatMap(page => page.neighborhoodPosts), pageParams: data.pageParams }),
      getNextPageParam: lastPage => {
        return lastPage.nextPage || null;
      },
    }
  );

  const fetchNextPageRestaurants = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    neighborhoodPosts,
    neighborhoodPostsIsLoading,
    reNeighborhoodPosts,
    fetchNextPageRestaurants,
    isFetchingNextPage,
  };
}
