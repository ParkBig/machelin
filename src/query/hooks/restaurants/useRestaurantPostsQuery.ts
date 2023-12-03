import { restaurantPostsQuery } from 'query/restaurants';
import { useQuery } from 'react-query';
import { IPost } from 'types/store/myInfoType';

export interface RestaurantPosts {
  ok: boolean;
  msg: string;
  machelinPosts: IPost[];
}

export default function useRestaurantPostsQuery(restaurantId: string) {
  const { data: restaurantPosts, refetch: reRestaurantPosts } = useQuery<RestaurantPosts>(
    ['restaurantPosts', restaurantId],
    () => restaurantPostsQuery(restaurantId)
  );

  return { restaurantPosts, reRestaurantPosts };
}
