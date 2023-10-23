import { restaurantsQuery, testRestaurantQuery } from 'query/restaurants';
import { useQuery } from 'react-query';
import { responseRestaurant } from 'types/data/restaureant';

export default function useGetRestaurantsQuery(lat: number, lng: number, radius: string, keyword: string = '식당') {
  const {
    isLoading,
    isError,
    data: restaurants,
    isSuccess,
    refetch: reRestaurants,
  } = useQuery<responseRestaurant>(['restaurants'], () => restaurantsQuery(lat, lng, radius, keyword));

  return { isLoading, isError, restaurants, isSuccess, reRestaurants };
}
