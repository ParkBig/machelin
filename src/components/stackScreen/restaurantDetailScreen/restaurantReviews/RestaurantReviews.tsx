import { StyleSheet, View } from 'react-native';
import MachelinReviews from './reviews/machelinReviews/MachelinReviews';
import GoogleReviews from './reviews/googleReviews/GoogleReviews';

export default function RestaurantReviews() {
  return (
    <View style={styles.wrap}>
      <MachelinReviews />
      <GoogleReviews />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginBottom: 30,
  },
});
