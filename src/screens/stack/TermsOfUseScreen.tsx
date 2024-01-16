import NotVerifiedUser from 'components/stackScreen/termsOfUseScreen/NotVerifiedUser';
import VerifiedUser from 'components/stackScreen/termsOfUseScreen/VerifiedUser';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, View } from 'react-native';

export default function TermsOfUseScreen() {
  const { myInfo } = useMyInfoQuery();

  return <View style={styles.wrap}>{myInfo?.authUser?.isVerified ? <VerifiedUser /> : <NotVerifiedUser />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
});
