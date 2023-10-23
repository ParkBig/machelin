import { ScrollView } from 'react-native';
import { mockRestaurantList } from 'data/mockRestaurantList';
import ListRestaurant from './ListRestaurant';

export default function Restaurants() {
  const mockData = mockRestaurantList;

  return (
    <ScrollView>
      {mockData.map(prop => (
        <ListRestaurant key={prop.place_id} restaurant={prop} />
      ))}
    </ScrollView>
  );
}
