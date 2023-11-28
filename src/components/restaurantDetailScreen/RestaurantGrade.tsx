import { useRoute } from '@react-navigation/native';
import { Colors } from 'const/global-styles';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { UseRouter } from 'types/screen/screenType';

export default function RestaurantGrade() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);

  return (
    <View style={styles.grades}>
      <View style={styles.grade}>
        <Text>Google</Text>
        <Text>{restaurantDetail?.detailRestaurant?.rating} /5</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grades: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  grade: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
