import { axiosRestaurants, restaurantPostsQuery } from 'query/restaurants';
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
    async ({ pageParam = 1 }) => {
      const { data } = await axiosRestaurants.get('/restaurantPosts', {
        params: {
          restaurantId,
          page: pageParam,
        },
      });

      return data;
    },
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

  return {
    restaurantPosts,
    restaurantPostsIsLoading,
    reRestaurantPosts,
    fetchNextPagePosts,
    isFetchingNextPage,
    hasNextPage,
  };
}
