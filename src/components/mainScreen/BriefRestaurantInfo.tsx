import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Restaurant } from 'types/data/restaureant';

interface Props {
  restaurant: Restaurant;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function BriefRestaurantInfo({ restaurant, style, onPress }: Props) {
  return (
    <Pressable key={restaurant.place_id} style={[styles.restaurant, style]} onPress={onPress}>
      <View>
        <Text>{restaurant.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  restaurant: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});
