import { useRoute } from '@react-navigation/native';
import { Colors } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { UseRouter } from 'types/screenType';

export default function RestaurantGrade() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);

  return (
    <View style={styles.grades}>
      <View style={styles.grade}>
        <Ionicons name="logo-google" size={30} color={Colors.mainGreen2} />
        <Text>{restaurantDetail?.restaurantDetail?.rating ? restaurantDetail?.restaurantDetail?.rating : 0} / 5</Text>
        <Text style={styles.totalText}>({restaurantDetail?.restaurantDetail?.user_ratings_total ? restaurantDetail?.restaurantDetail?.user_ratings_total : 0})</Text>
      </View>
      <View style={styles.grade}>
        <Ionicons name="restaurant" size={30} color={Colors.mainGreen2} />
        <Text>{restaurantDetail?.machelinRating.toFixed(2)} / 5 </Text>
        <Text style={styles.totalText}>({restaurantDetail?.machelinTotal})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grades: {
    width: '100%',
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grade: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  totalText: {
    color: Colors.gray,
  },
});
