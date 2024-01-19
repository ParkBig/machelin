import { Image, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { ScreenWidth } from 'const/dimenstions';
import Button from '../layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';

interface Props {
  imageSource: any;
  toggleModal: boolean;
  toggleModalHandler: () => void;
}

export default function UserImageModal({ imageSource, toggleModal, toggleModalHandler }: Props) {
  return (
    <Modal style={styles.modal} isVisible={toggleModal} onBackButtonPress={toggleModalHandler}>
      <View style={styles.wrap}>
        <Button style={styles.toggleOffButton} onPress={toggleModalHandler}>
          <Ionicons name="close" size={40} color={Colors.mainWhite3} />
        </Button>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={imageSource} resizeMode="contain" />
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
    top: 10,
    left: 0,
  },
  imageWrap: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ScreenWidth,
    height: ScreenWidth,
  },
});