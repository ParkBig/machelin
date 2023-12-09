import { restaurantsTextSearchQuery } from 'query/restaurants';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { regionalRestaurantSearchInputState } from 'store/searchState';
import { GooglePlace } from 'types/data/restaureant';

interface Data {
  ok: boolean;
  msg: string;
  restaurants: GooglePlace[];
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
    isRefetching: isReRestaurants,
  } = useQuery<Data>(['regionalRestaurantSearch', keyword], () => restaurantsTextSearchQuery(keyword), {
    enabled: isTyping ? false : true,
  });

  useEffect(() => {
    reRestaurants();
  }, [isTyping, city, district, reRestaurants]);

  return { restaurants, restaurantsIsLoading, reRestaurants, isReRestaurants };
}
