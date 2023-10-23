import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import MyNickname from './MyNickname';
import MyEmail from './MyEmail';
import Line from 'components/common/Line';

export default function MyInfos() {
  return (
    <View style={styles.wrap}>
      <MyNickname />
      <Line style={styles.line} />
      <MyEmail />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mainGreen2,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.mainGreen2,
  },
});
