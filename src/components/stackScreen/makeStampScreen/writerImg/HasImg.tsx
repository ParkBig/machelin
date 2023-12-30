import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import Swiper from 'react-native-swiper';
import { ScreenWidth } from 'const/dimenstions';
import { makeStampState } from 'store/makeStampState';
import PickedImage from './PickedImage';

export default function HasImg() {
  const { images } = useRecoilValue(makeStampState);

  return (
    <View style={styles.wrap}>
      <Swiper>
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
