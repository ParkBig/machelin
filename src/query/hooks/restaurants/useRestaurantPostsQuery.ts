import { restaurantPostsQuery } from 'query/restaurants';
import { useInfiniteQuery } from 'react-query';
import { IPost } from 'types/store/myInfoType';

export interface RestaurantPosts {
  ok: boolean;
  msg: string;
  machelinPosts: IPost[];
  nextPage: number | null;
}

export default function useRestaurantPostsQuery(restaurantId: string) {
  const {
    data: restaurantPosts,
    refetch: reRestaurantPosts,
    isLoading: restaurantPostsIsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<RestaurantPosts, unknown, IPost>(
    ['restaurantPosts', restaurantId],
    ({ pageParam = 1 }) => restaurantPostsQuery(restaurantId, pageParam),
    {
      select: data => ({ pages: data.pages.flatMap(page => page.machelinPosts), pageParams: data.pageParams }),
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

  return { restaurantPosts, restaurantPostsIsLoading, reRestaurantPosts, fetchNextPagePosts, isFetchingNextPage };
}
