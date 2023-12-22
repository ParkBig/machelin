import { ScreenWidth } from 'const/dimenstions';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screenType';
import imageTranslator from 'util/imageTranslator';

export default function RestaurantImg() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);

  const images = imageTranslator(restaurantDetail?.restaurantDetail.photos);

  return (
    <View style={styles.wrap}>
      {images.length === 0 ? (
        <Image source={{ uri: 'https://maps.gstatic.com/tactile/pane/default_geocode-1x.png' }} style={styles.img} />
      ) : (
        <Swiper>
          {images.map((image, index) => (
            <Image key={`${image}_${index}`} source={{ uri: image }} resizeMode="cover" style={styles.img} />
          ))}
        </Swiper>
      )}
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
  },
});
