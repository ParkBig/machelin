import { StyleSheet, View } from 'react-native';
import GotoLoginSignUp from './GotoLoginSignUp';
import BriefLoginInfo from './BriefLoginInfo';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function LoginInfo() {
  const { myInfo } = useMyInfoQuery();

  return <View style={styles.wrap}>{myInfo?.ok ? <BriefLoginInfo /> : <GotoLoginSignUp />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 10,
  },
});
