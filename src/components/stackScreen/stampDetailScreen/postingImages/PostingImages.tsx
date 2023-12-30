import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { ScreenWidth } from 'const/dimenstions';
import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screenType';
import PostingImage from 'components/common/card/post/postingImages/PostingImage';

export default function PostingImages() {
  const {
    params: {
      stamp: { images },
    },
  } = useRoute<UseRouter<'StampDetailScreen'>>();

  if (images.length === 0) return null;

  return (
    <View style={styles.wrap}>
      <Swiper>
        {images.map(image => (
          <PostingImage key={image} image={image} />
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxHeight: (ScreenWidth * 3) / 4,
    flexDirection: 'row',
    marginVertical: 30,
  },
});
