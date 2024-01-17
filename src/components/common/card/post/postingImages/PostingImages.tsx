import { Pressable, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import PostingImage from './PostingImage';
import { ScreenWidth } from 'const/dimenstions';
import { useState } from 'react';
import PostImagesModal from 'components/common/modal/PostImagesModal';

interface Props {
  images: string[];
}

export default function PostingImages({ images }: Props) {
  if (images.length === 0) return null;
  
  const [toggleImagesModal, setToggleImagesModal] = useState(false);

  const toggleImagesModalHandler = () => {
    setToggleImagesModal(prev => !prev);
  };

  return (
    <View style={styles.wrap}>
      <Swiper loop={false}>
        {images.map(image => (
          <Pressable style={styles.button} key={image} onPress={toggleImagesModalHandler}>
            <PostingImage image={image} />
            {toggleImagesModal && <PostImagesModal images={images} toggleModal={toggleImagesModal} toggleModalHandler={toggleImagesModalHandler} />}
          </Pressable>
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
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
