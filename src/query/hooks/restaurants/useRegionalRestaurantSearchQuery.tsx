import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { regionalRestaurantSearchInputState } from 'store/searchState';
import { GooglePlace } from 'types/types';
import useUsersSubLocalityQuery from '../users/useUsersSubLocalityQuery';
import { axiosRestaurants } from 'query/api/restaurants';

interface Data {
  ok: boolean;
  msg: string;
  restaurants: GooglePlace[];
  next_page_token: string;
}

export default function useRegionalRestaurantSearchQuery() {
  const { mySubLocality } = useUsersSubLocalityQuery();
  const {
    isTyping,
    searchText,
    location: { city, district },
  } = useRecoilValue(regionalRestaurantSearchInputState);

  // have to change
  const keyword = city + district;

  const {
    data: restaurants,
    isLoading: restaurantsIsLoading,
    refetch: reRestaurants,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, GooglePlace>(
    ['nearbyRestaurantsSearch', keyword],
    async ({ pageParam = null }) => {
      const { data } = await axiosRestaurants.get('/restaurantsTextSearch', {
        params: {
          keyword,
          isRestaurant: true,
          nextPageParams: pageParam ? pageParam : null,
        },
      });

      return data;
    },
    {
      enabled: isTyping ? false : true,
      select: data => ({ pages: data.pages.flatMap(page => page.restaurants), pageParams: data.pageParams }),
      getNextPageParam: lastPage => {
        return lastPage.next_page_token || null;
      },
    }
  );

  const fetchNextPageRestaurants = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return { restaurants, restaurantsIsLoading, reRestaurants, fetchNextPageRestaurants, isFetchingNextPage };
}
