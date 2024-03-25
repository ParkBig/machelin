import { axiosRestaurants } from 'query/api/restaurants';
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { myLocationState, searchRadiusState } from 'store/locationState';
import { mainSearchState } from 'store/searchState';
import { toggleNearbySearchState } from 'store/toggleState';
import { GooglePlace } from 'types/types';

interface Data {
  ok: boolean;
  msg: string;
  restaurants: GooglePlace[];
  next_page_token: string;
}

export default function useNearbyRestaurantsSearchQuery() {
  const mainSearch = useRecoilValue(mainSearchState);
  const searchRadius = useRecoilValue(searchRadiusState);
  const toggleNearbySearch = useRecoilValue(toggleNearbySearchState);
  const { isGetLocation, latitude, longitude } = useRecoilValue(myLocationState);

  const keyword = mainSearch.mainSearchValue ? mainSearch.mainSearchValue : '';

  const {
    data: restaurants,
    isLoading: restaurantsIsLoading,
    refetch: reRestaurants,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, GooglePlace>(
    ['nearbyRestaurantsSearch', latitude, longitude, searchRadius, keyword],
    async ({ pageParam = null }) => {
      const { data } = await axiosRestaurants.get('/nearbyRestaurantsSearch', {
        params: {
          lat: latitude,
          lng: longitude,
          radius: searchRadius,
          keyword,
          nextPageParams: pageParam ? pageParam : null,
        },
      });

      return data;
    },
    {
      enabled: isGetLocation && toggleNearbySearch && !mainSearch.isTyping ? true : false,
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
  }, [mainSearch.mainSearchValue, searchRadius, reRestaurants]);

  return { restaurants, restaurantsIsLoading, reRestaurants, fetchNextPageRestaurants, isFetchingNextPage };
}
