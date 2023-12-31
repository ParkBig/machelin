import { StyleSheet, Text, View } from 'react-native';
import GotoLoginSignUp from './GotoLoginSignUp';
import BriefLoginInfo from './BriefLoginInfo';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useNetInfo } from '@react-native-community/netinfo';

export default function LoginInfo() {
  const netInfo = useNetInfo();
  const { myInfo } = useMyInfoQuery();

  return (
    <View style={styles.wrap}>
      {netInfo.isConnected ? (
        myInfo?.authUser ? (
          <BriefLoginInfo />
        ) : (
          <GotoLoginSignUp />
        )
      ) : (
        <View style={styles.netInfo}>
          <Text>인터넷 연결이 불안정합니다</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 10,
  },
  netInfo: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
