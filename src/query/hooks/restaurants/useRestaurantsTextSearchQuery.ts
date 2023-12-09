import { restaurantsTextSearchQuery } from 'query/restaurants';
import { useQuery } from 'react-query';
import { GooglePlace } from 'types/data/restaureant';

interface Data {
  ok: boolean;
  msg: string;
  restaurants: GooglePlace[];
}

export default function useRestaurantsTextSearchQuery(keyword: string) {
  const {
    data: restaurants,
    isLoading: restaurantsIsLoading,
    refetch: reRestaurants,
  } = useQuery<Data>(['restaurantsSearch', keyword], () => restaurantsTextSearchQuery(keyword));

  return { restaurants, restaurantsIsLoading, reRestaurants };
}
