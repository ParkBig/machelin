import FunctionBar from 'components/stackScreen/restaurantDetailMapScreen/functionBar/FunctionBar';
import RestaurantDetailMap from 'components/stackScreen/restaurantDetailMapScreen/map/RestaurantDetailMap';
import { StyleSheet, View } from 'react-native';

export default function RestaurantDetailMapScreen() {
  return (
    <View style={styles.wrap}>
      <RestaurantDetailMap />
      <FunctionBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
