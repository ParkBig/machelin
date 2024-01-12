import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { regionalRestaurantSearchInputState } from 'store/searchState';
import { GooglePlace } from 'types/types';
import useUsersSubLocalityQuery from '../users/useUsersSubLocalityQuery';
import trimMySubLocality from 'util/ trimMySubLocality';
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

  const { city: myCity } = trimMySubLocality(mySubLocality?.subLocality);

  const keyword =
    city === '전체'
      ? myCity
        ? `대한민국 ${myCity} ${searchText ? searchText : ''}`
        : `대한민국서울 강남 ${searchText ? searchText : ''}`
      : `대한민국 ${city} ${district === '전체' ? '' : district} ${searchText ? searchText : ''}`;

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
