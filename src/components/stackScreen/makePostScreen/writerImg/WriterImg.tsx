import { useRecoilValue } from 'recoil';
import { makePostState } from 'store/makePostState';
import HasImg from './HasImg';
import GetImg from './GetImg';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'const/global-styles';

export default function WriterImg() {
  const { images } = useRecoilValue(makePostState);

  return <View style={styles.wrap}>{images.length ? <HasImg /> : <GetImg />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomColor: Colors.mainGreen1,
    borderBottomWidth: 2,
  },
});
