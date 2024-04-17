import { Colors, Size } from 'const/global-styles';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Line from 'components/common/layout/Line';
import GoogleReview from 'components/common/card/GoogleReview';
import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screenType';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import NoGoogleReviews from './NoGoogleReviews';
import { Ionicons } from '@expo/vector-icons';

export default function GoogleReviews() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);

  const reviews = restaurantDetail?.restaurantDetail.reviews;

  return (
    <>
      <View style={styles.reviewTitle}>
        <Ionicons name="logo-google" size={30} color={Colors.mainWhite3} />
        <Text style={styles.titleText}>구글리뷰</Text>
      </View>
      {reviews && reviews.length !== 0 ? (
        <FlatList
          scrollEnabled={false}
          style={styles.reviews}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.author_name}_${index}`}
          data={reviews}
          renderItem={({ item }) => <GoogleReview review={item} />}
          ItemSeparatorComponent={() => <Line style={styles.line} />}
          ListFooterComponent={() => <Line style={styles.line} />}
        />
      ) : (
        <NoGoogleReviews />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  reviewTitle: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.googleBackground,
    gap: 5,
  },
  titleText: {
    fontSize: Size.bigSmall,
    fontWeight: 'bold',
    color: Colors.mainWhite3,
  },
  reviews: {
    width: '100%',
  },
  headerLine: {
    width: '100%',
    height: 3,
    backgroundColor: Colors.googleBackground,
  },
  line: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.lightGrayOpacity1,
  },
});
