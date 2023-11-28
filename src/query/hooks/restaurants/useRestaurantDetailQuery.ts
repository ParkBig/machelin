import { restaurantDetailQuery } from 'query/restaurants';
import { useQuery } from 'react-query';
import { DetailRestaurant } from 'types/data/restaureant';

interface Data {
  ok: boolean;
  detailRestaurant: DetailRestaurant;
  msg: string;
}

export default function useRestaurantDetailQuery(restaurantId: string) {
  const {
    isLoading: restaurantDetailIsLoading,
    isError,
    data: restaurantDetail,
    isSuccess,
    refetch: reRestaurantDetail,
  } = useQuery<Data>(['restaurantDetail'], () => restaurantDetailQuery(restaurantId));

  return { restaurantDetailIsLoading, isError, restaurantDetail, isSuccess, reRestaurantDetail };
}
