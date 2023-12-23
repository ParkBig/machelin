import { useRecoilValue } from 'recoil';
import { makeStampState } from 'store/makeStampState';
import HasRestaurantInfo from './HasRestaurantInfo';
import GoToTagRestaurantInfo from './GoToTagRestaurantInfo';

export default function RestaurantInfo() {
  const { restaurantInfo } = useRecoilValue(makeStampState);

  return <>{restaurantInfo ? <HasRestaurantInfo /> : <GoToTagRestaurantInfo />}</>;
}
