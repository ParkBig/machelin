import BriefIntro from 'components/loginSignUpScreen/BriefIntro';
import GoBack from 'components/loginSignUpScreen/GoBack';
import SelectLoginPlatform from 'components/loginSignUpScreen/SelectLoginPlatform';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function SelectLoginPlatformScreen() {
  return (
    <SafeAreaView style={styles.wrap}>
      <GoBack />
      <BriefIntro />
      <SelectLoginPlatform />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
