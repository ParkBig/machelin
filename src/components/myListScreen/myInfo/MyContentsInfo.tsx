import { StyleSheet, Text, View } from 'react-native';
import MyFunctions from './MyFunctions';
import useMyInfoQuery from 'query/hooks/useMyInfoQuery';

export default function MyContentsInfo() {
  const { myInfo } = useMyInfoQuery();

  return (
    <View style={[styles.wrap, !myInfo && styles.notLoginWrap]}>
      {!myInfo && (
        <View style={styles.notLogin}>
          <Text>로그인후 이용가능합니다</Text>
        </View>
      )}
      <MyFunctions />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  notLoginWrap: {
    opacity: 0.5,
    position: 'relative',
  },
  notLogin: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
