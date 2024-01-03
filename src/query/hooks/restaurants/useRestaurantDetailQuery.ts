import { axiosRestaurants } from 'query/api/restaurants';
import { useQuery } from 'react-query';
import { GooglePlace } from 'types/types';
import { IPost } from 'types/types';

interface Data {
  ok: boolean;
  restaurantDetail: GooglePlace;
  machelinPosts: IPost[];
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
