import { ScreenWidth } from 'const/dimenstions';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screen/screenType';

export default function RestaurantImg() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);

  return (
    <View style={styles.wrap}>
      <Swiper>
        <View>
          <Text>image here</Text>
        </View>
        {/* {restaurantDetail?.detailRestaurant?.images?.map(contents => (
          <View style={styles.img} key={contents.photo_reference}>
            <Text>oo</Text>
          </View>
        ))} */}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: (ScreenWidth * 3) / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
});
