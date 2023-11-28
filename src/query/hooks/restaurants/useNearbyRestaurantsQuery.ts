import { restaurantsQuery } from 'query/restaurants';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { myLocationState, searchRadiusState } from 'store/locationState';
import { mainSearchState } from 'store/searchState';
import { IRestaurantInfo } from 'types/data/restaureant';

interface Data {
  ok: boolean;
  msg: string;
  restaurants: IRestaurantInfo[];
}

export default function useNearbyRestaurantsQuery() {
  const mainSearch = useRecoilValue(mainSearchState);
  const searchRadius = useRecoilValue(searchRadiusState);
  const { isGetLocation, latitude, longitude } = useRecoilValue(myLocationState);

  const keyword = mainSearch.mainSearchValue ? mainSearch.mainSearchValue : '식당';

  const {
    isLoading,
    isError,
    data: restaurants,
    isSuccess,
    refetch: reRestaurants,
  } = useQuery<Data>(
    ['nearbyRestaurants'],
    () => restaurantsQuery(latitude, longitude, searchRadius, keyword),
    {
      enabled: !!isGetLocation || mainSearch.isTyping,
    }
  );

  return { isLoading, isError, restaurants, isSuccess, reRestaurants };
}
