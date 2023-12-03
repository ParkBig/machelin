import { restaurantDetailQuery } from 'query/restaurants';
import { useQuery } from 'react-query';
import { RestaurantDetail } from 'types/data/restaureant';
import { IPost } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  restaurantDetail: RestaurantDetail;
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
  } = useQuery<Data>(['restaurantDetail', restaurantId], () => restaurantDetailQuery(restaurantId));

  return { restaurantDetailIsLoading, isError, restaurantDetail, isSuccess, reRestaurantDetail };
}
