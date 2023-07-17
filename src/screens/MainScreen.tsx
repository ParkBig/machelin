import Map from 'components/mainScreen/Map';
import RestaurantList from 'components/mainScreen/RestaurantList';
import { View, StyleSheet } from 'react-native';

export default function MainScreen() {
  return (
    <View style={styles.wrap}>
      <Map />
      <RestaurantList />
    </View>
  )
}

const styles =StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  }
})