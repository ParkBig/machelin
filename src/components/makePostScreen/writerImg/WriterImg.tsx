import { useRecoilValue } from 'recoil';
import { makePostState } from 'store/makePostState';
import TakedImg from './TakedImg';
import GetImg from './GetImg';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'const/global-styles';

export default function WriterImg() {
  const { images } = useRecoilValue(makePostState);

  return <View style={styles.wrap}>{images.length ? <TakedImg /> : <GetImg />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 10,
    borderBottomColor: Colors.mainGreen2,
    borderBottomWidth: 2,
  },
});
