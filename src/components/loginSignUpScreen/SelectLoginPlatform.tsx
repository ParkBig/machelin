import { StyleSheet, View } from 'react-native';
import StartKakaoLogin from './StartKakaoLogin';
import StartNaverLogin from './StartNaverLogin';
import StartGoogleLogin from './StartGoogleLogin';
import StartEmailLogin from './StartEmailLogin';

export default function SelectLoginPlatform() {
  return (
    <View style={styles.wrap}>
      <StartKakaoLogin />
      <StartNaverLogin />
      <StartGoogleLogin />
      <StartEmailLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
});
