import { restaurantsQuery } from 'query/restaurants';
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { myLocationState, searchRadiusState } from 'store/locationState';
import { mainSearchState } from 'store/searchState';
import { IRestaurantInfo } from 'types/data/restaureant';

interface Data {
  ok: boolean;
  msg: string;
  restaurants: IRestaurantInfo[];
  next_page_token: string;
}

export default function useNearbyRestaurantsQuery() {
  const mainSearch = useRecoilValue(mainSearchState);
  const searchRadius = useRecoilValue(searchRadiusState);
  const { isGetLocation, latitude, longitude } = useRecoilValue(myLocationState);

  const keyword = mainSearch.mainSearchValue ? mainSearch.mainSearchValue : '식당';

  const {
    data: restaurants,
    isLoading: restaurantsIsLoading,
    refetch: reRestaurants,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, IRestaurantInfo>(
    ['nearbyRestaurants', latitude, longitude, searchRadius, keyword],
    ({ pageParam = null }) => restaurantsQuery(latitude, longitude, searchRadius, keyword, pageParam),
    {
      enabled: isGetLocation && !mainSearch.isTyping ? true : false,
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
  }

  useEffect(() => {
    reRestaurants();
  }, [mainSearch.mainSearchValue, searchRadius]);

  return { restaurants, restaurantsIsLoading, reRestaurants, fetchNextPageRestaurants, isFetchingNextPage };
}

// export default function useNearbyRestaurantsQuery() {
//   const mainSearch = useRecoilValue(mainSearchState);
//   const searchRadius = useRecoilValue(searchRadiusState);
//   const { isGetLocation, latitude, longitude } = useRecoilValue(myLocationState);

//   const keyword = mainSearch.mainSearchValue ? mainSearch.mainSearchValue : '식당';

//   const {
//     isLoading,
//     isError,
//     data: restaurants,
//     isSuccess,
//     refetch: reRestaurants,
//   } = useQuery<Data>(['nearbyRestaurants', latitude, longitude, searchRadius, keyword], () => restaurantsQuery(latitude, longitude, searchRadius, keyword), {
//     enabled: isGetLocation && !mainSearch.isTyping ? true : false,
//   });

//   useEffect(() => {
//     reRestaurants();
//   }, [mainSearch.mainSearchValue, searchRadius]);

//   return { isLoading, isError, restaurants, isSuccess, reRestaurants };
// }
