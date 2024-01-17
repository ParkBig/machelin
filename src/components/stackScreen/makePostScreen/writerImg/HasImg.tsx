import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { makePostState } from 'store/makePostState';
import PickedImage from './PickedImage';
import Swiper from 'react-native-swiper';
import { ScreenWidth } from 'const/dimenstions';

export default function HasImg() {
  const { images } = useRecoilValue(makePostState);

  return (
    <View style={styles.wrap}>
      <Swiper loop={false}>
        {images.map(image => <PickedImage uri={image} key={image} />)}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: (ScreenWidth * 3) / 4,
    paddingVertical: 20,
  },
});
