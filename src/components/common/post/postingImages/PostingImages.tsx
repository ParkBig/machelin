import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import PostingImage from './PostingImage';
import { ScreenWidth } from 'const/dimenstions';

interface Props {
  images: string[];
}

export default function PostingImages({ images }: Props) {
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
    paddingVertical: 10,
  },
});
