import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Restaurant } from 'types/data/restaureant';
import BriefRestaurantInfo from './BriefRestaurantInfo';

interface Props {
  restaurants: Restaurant[];
}

export default function ScrollList({ restaurants }: Props) {
  return (
    <ScrollView style={styles.restaurantList} contentContainerStyle={{ rowGap: 5 }}>
      {restaurants.map(prop => (
        <BriefRestaurantInfo key={prop.place_id} restaurant={prop} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  restaurantList: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
