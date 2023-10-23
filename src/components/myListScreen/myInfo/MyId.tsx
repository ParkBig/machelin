import { StyleSheet, Text, View } from 'react-native';
import GotoLoginSignUp from './GotoLoginSignUp';
import BriefLoginInfo from './BriefLoginInfo';
import useMyInfoQuery from 'query/hooks/useMyInfoQuery';

export default function MyId() {
  const { myInfo } = useMyInfoQuery();

  return <View style={styles.wrap}>{myInfo?.ok ? <BriefLoginInfo /> : <GotoLoginSignUp />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
  },
});
