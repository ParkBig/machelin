import { restaurantsTextSearchQuery } from 'query/restaurants';
import { useEffect } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { regionalRestaurantSearchInputState } from 'store/searchState';
import { GooglePlace } from 'types/data/restaureant';

interface Data {
  ok: boolean;
  msg: string;
  restaurants: GooglePlace[];
  next_page_token: string;
}

export default function useRegionalRestaurantSearchQuery() {
  const {
    isTyping,
    searchText,
    location: { city, district },
  } = useRecoilValue(regionalRestaurantSearchInputState);

  const keyword = `${city === '전체' ? '' : city} ${district === '전체' ? '' : district} ${
    searchText ? searchText : ''
  }`;

  const {
    data: restaurants,
    isLoading: restaurantsIsLoading,
    refetch: reRestaurants,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, GooglePlace>(
    ['nearbyRestaurantsSearch', keyword],
    ({ pageParam = null }) => restaurantsTextSearchQuery(keyword, pageParam),
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

  useEffect(() => {
    reRestaurants();
  }, [isTyping, city, district, reRestaurants]);

  return { restaurants, restaurantsIsLoading, reRestaurants, fetchNextPageRestaurants, isFetchingNextPage };
}
