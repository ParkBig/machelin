import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/Button';
import { StyleSheet, Text, View } from 'react-native';
import { DetailRestaurant, Review } from 'types/data/restaureant';
import { UseNavigation } from 'types/screen/screenType';

interface Props {
  restaurantInfo: DetailRestaurant;
}

export default function RestaurantReviews({ restaurantInfo }: Props) {
  const { navigate } = useNavigation<UseNavigation<'RestaurantDetailScreen'>>();

  const goToMakePostHandler = () => {
    navigate('MakePostScreen', {
      restaurantInfo,
    });
  };

  return (
    <View style={styles.reviews}>
      <View style={styles.reviewTitle}>
        <Text>리뷰</Text>
        <Button onPress={goToMakePostHandler}>
          <Text>리뷰작성</Text>
        </Button>
      </View>
      <Text>reviews</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reviews: {
    width: '100%',
    paddingHorizontal: 15,
  },
  reviewTitle: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
