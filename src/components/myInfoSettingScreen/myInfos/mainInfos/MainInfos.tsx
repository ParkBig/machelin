import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import MyNickname from './MyNickname';
import MyEmail from './MyEmail';
import Line from 'components/common/Line';
import MyMobile from './MyMobile';

export default function MainInfos() {
  return (
    <View style={styles.wrap}>
      <MyNickname />
      <Line style={styles.line} />
      <MyEmail />
      <Line style={styles.line} />
      <MyMobile />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginBottom: 30,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: Colors.mainGreen2,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.mainGreen2,
  },
});
