import { Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import Button from '../layout/Button';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { Colors } from 'const/global-styles';
import PostingImage from '../card/post/postingImages/PostingImage';
import { StatusBarHeight } from 'const/dimenstions';

interface Props {
  images: string[];
  toggleModal: boolean;
  toggleModalHandler: () => void;
}

export default function PostImagesModal({ images, toggleModal, toggleModalHandler }: Props) {
  return (
    <Modal style={styles.modal} isVisible={toggleModal} onBackButtonPress={toggleModalHandler}>
      <View style={styles.wrap}>
        <Button style={styles.toggleOffButton} onPress={toggleModalHandler}>
          <Ionicons name="close" size={40} color={Colors.mainWhite3} />
        </Button>
        <View style={styles.imageWrap}>
          <Swiper loop={false}>
            {images.map(image => (
              <PostingImage key={image} image={image} />
            ))}
          </Swiper>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  toggleOffButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: StatusBarHeight && Platform.OS === 'android' ? 10 : StatusBarHeight,
    left: 0,
    zIndex: 10,
  },
  imageWrap: {
    height: '100%',
    width: '100%',
    paddingVertical: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
