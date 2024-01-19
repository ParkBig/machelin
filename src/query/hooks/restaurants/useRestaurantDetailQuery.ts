import { axiosRestaurants } from 'query/api/restaurants';
import { useQuery } from 'react-query';
import { GooglePlace } from 'types/types';

interface Data {
  ok: boolean;
  restaurantDetail: GooglePlace;
  machelinRating: number;
  machelinTotal: number;
  msg: string;
}

export default function useRestaurantDetailQuery(restaurantId: string) {
  const {
    isLoading: restaurantDetailIsLoading,
    isError,
    data: restaurantDetail,
    isSuccess,
    refetch: reRestaurantDetail,
  } = useQuery<Data>(['restaurantDetail', restaurantId], async () => {
    const { data } = await axiosRestaurants.get('/restaurantDetail', {
      params: {
        restaurantId,
      },
    });

    return data;
  });

  return { restaurantDetailIsLoading, isError, restaurantDetail, isSuccess, reRestaurantDetail };
}
