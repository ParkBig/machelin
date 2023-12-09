import BriefIntro from 'components/stackScreen/mobileVerificationScreen/BriefIntro';
import GoBack from 'components/stackScreen/mobileVerificationScreen/GoBack';
import Verify from 'components/stackScreen/mobileVerificationScreen/Verify/Verify';
import { Colors } from 'const/global-styles';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function MobileVerificationScreen() {
  return (
    <SafeAreaView style={styles.wrap}>
      <GoBack />
      <BriefIntro />
      <Verify />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.mainWhite1,
  },
});
