import { restaurantDetailQuery } from 'query/restaurants';
import { useQuery } from 'react-query';
import { DetailRestaurant } from 'types/data/restaureant';

export default function useGetRestaurantDetailQuery(placeId: string) {
  const {
    isLoading,
    isError,
    data: restaurantDetail,
    isSuccess,
    refetch: reRestaurantDetail,
  } = useQuery<DetailRestaurant>(['restaurantDetail'], () => restaurantDetailQuery(placeId));

  return { isLoading, isError, restaurantDetail, isSuccess, reRestaurantDetail };
}
