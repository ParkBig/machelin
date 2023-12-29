import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screenType';
import HasRestaurantInfo from './HasRestaurantInfo';
import NoRestaurantInfo from './NoRestaurantInfo';

export default function ChoseRestaurant() {
  const { params } = useRoute<UseRouter<'MakePostScreen'>>();

  return (
    <>{params.restaurantInfo ? <HasRestaurantInfo restaurantInfo={params.restaurantInfo} /> : <NoRestaurantInfo />}</>
  );
}
